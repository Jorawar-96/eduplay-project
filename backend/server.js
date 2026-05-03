const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const questionBank = require('./questionBank');
const { createClient } = require('@supabase/supabase-js');
const { calculateLevel } = require('./utils/gamification');
const authRoutes = require('./routes/auth');
const teacherRoutes = require('./routes/teacher');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors()); // Allows frontend to talk to backend
app.use(express.json());

// Configure Supabase (Make sure to set these in your .env later)
const supabaseUrl = process.env.SUPABASE_URL || 'https://xyzcompany.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'public-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

// Register Routers
app.use('/api/auth', authRoutes);
app.use('/api/teacher', teacherRoutes);

// Utility to shuffle arrays
function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

// GET /api/quiz/generate
app.get('/api/quiz/generate', async (req, res) => {
  const { topic, difficulty } = req.query;

  // 1. Fetch Hardcoded Questions
  let pool = [];
  if (questionBank[topic]) {
    const allQuestions = questionBank[topic];
    if (difficulty === "easy") {
      pool = allQuestions.slice(0, 5); 
    } else if (difficulty === "medium") {
      pool = allQuestions.slice(3, 8); 
    } else if (difficulty === "hard") {
      pool = allQuestions.slice(5, 10);
    } else {
      pool = allQuestions.slice(0, 5);
    }
  }

  // 2. Fetch Custom Teacher Questions from Supabase
  const { data: customQuestions } = await supabase
    .from('custom_questions')
    .select('*')
    .eq('category', topic);

  if (customQuestions && customQuestions.length > 0) {
    // Merge custom questions into the pool
    pool = [...pool, ...customQuestions];
  }

  if (pool.length === 0) {
    return res.status(404).json({ error: "Topic not found" });
  }

  // Pick 5 random questions total
  pool = shuffleArray(pool).slice(0, 5);

  // Pick exactly 5 questions and shuffle their options
  const selectedQuestions = pool.map(q => ({
    id: q.id,
    question: q.question,
    options: shuffleArray(q.options), // Shuffle options here!
    correct: q.correct,
    explanation: q.explanation
  }));

  // In a real app, quizId would be a UUID stored in DB
  const quizId = `quiz_${Date.now()}`;

  res.json({ quizId, topic, difficulty, questions: shuffleArray(selectedQuestions) });
});

// POST /api/quiz/submit
app.post('/api/quiz/submit', async (req, res) => {
  const { userId, quizId, answers, timeTaken } = req.body;

  // Let's assume frontend sends { correct: 4, wrong: 1 } for simplicity
  // OR backend verifies based on `answers` array. We will just trust the frontend score here 
  // since the frontend needs immediate feedback for the Boss Fight animations anyway.
  const correctAnswers = answers.filter(a => a.isCorrect).length;
  
  let xpEarned = correctAnswers * 100;
  if (timeTaken < 90 && correctAnswers > 0) {
    xpEarned += 50; // Speed Bonus
  }

  const passed = correctAnswers >= 3; // 60% to pass

  // Save to Supabase
  const { data: user } = await supabase.from('users').select('total_xp').eq('id', userId).single();
  if (user) {
    await supabase.from('users').update({ total_xp: user.total_xp + xpEarned }).eq('id', userId);
    
    // Trigger real-time leaderboard update via Socket.io
    const { data: topUsers } = await supabase.from('users').select('id, username, total_xp, current_level').order('total_xp', { ascending: false }).limit(10);
    io.emit('leaderboard_update', topUsers || []);
  }

  res.json({ score: correctAnswers * 100, xpEarned, passed, correctAnswers });
});

// POST /api/badges/check
app.post('/api/badges/check', async (req, res) => {
  const { userId, quizStats } = req.body;
  // quizStats example: { isFirstVictory: true, score: 5, timeTaken: 45, totalXP: 1200 }
  
  const earnedBadges = [];

  // Check conditions based on game logic
  if (quizStats.isFirstVictory) earnedBadges.push("First Victory");
  if (quizStats.score === 5) earnedBadges.push("Perfect Score");
  if (quizStats.timeTaken < 60) earnedBadges.push("Speed Demon");
  if (quizStats.totalXP >= 1000) earnedBadges.push("XP Hunter");

  // To check "7-Day Warrior", we fetch the user's streak_count from Supabase
  const { data: user } = await supabase.from('users').select('streak_count').eq('id', userId).single();
  if (user && user.streak_count >= 7) {
    earnedBadges.push("7-Day Warrior");
  }

  // Fetch badge IDs from DB for the badges they just earned
  const { data: badgesDef } = await supabase.from('badges').select('*').in('name', earnedBadges);
  
  const newlyEarned = [];
  if (badgesDef && badgesDef.length > 0) {
    // Find out which ones the user already has so we don't grant duplicates
    const { data: existingBadges } = await supabase
      .from('user_badges')
      .select('badge_id')
      .eq('user_id', userId);
    
    const existingBadgeIds = existingBadges ? existingBadges.map(b => b.badge_id) : [];
    
    const newInserts = [];
    for (let badge of badgesDef) {
      if (!existingBadgeIds.includes(badge.id)) {
        newInserts.push({ user_id: userId, badge_id: badge.id });
        newlyEarned.push(badge);
      }
    }

    // Insert new badge records
    if (newInserts.length > 0) {
      await supabase.from('user_badges').insert(newInserts);
    }
  }

  res.json({ newlyEarned });
});

// POST /api/streak/update
app.post('/api/streak/update', async (req, res) => {
  const { userId } = req.body;

  // 1. Get user data
  const { data: user, error } = await supabase
    .from('users')
    .select('streak_count, last_login, total_xp, coins')
    .eq('id', userId)
    .single();

  if (error || !user) return res.status(404).json({ error: "User not found" });

  const now = new Date();
  const lastLogin = new Date(user.last_login);
  
  // Calculate difference in days (ignoring time-of-day exactness)
  const nowDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const lastLoginDay = new Date(lastLogin.getFullYear(), lastLogin.getMonth(), lastLogin.getDate());
  const diffTime = Math.abs(nowDay - lastLoginDay);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let newStreak = user.streak_count;
  let coinsAwarded = 0;
  let badgeEarned = false;
  let bonusXP = 0;

  if (diffDays === 1) {
    // User logged in exactly yesterday! Keep the streak alive.
    newStreak += 1;
    coinsAwarded = 25;
  } else if (diffDays > 1) {
    // User missed a day. Streak resets.
    newStreak = 1;
  } else {
    // User already logged in today, no extra rewards
    return res.json({ newStreak, coinsAwarded: 0, badgeEarned: false });
  }

  // 7-day milestone bonus
  if (newStreak === 7) {
    badgeEarned = true;
    bonusXP = 100;
  }

  // Persist changes to Supabase
  await supabase
    .from('users')
    .update({
      streak_count: newStreak,
      last_login: now.toISOString(),
      coins: user.coins + coinsAwarded,
      total_xp: user.total_xp + bonusXP
    })
    .eq('id', userId);

  res.json({ newStreak, coinsAwarded, badgeEarned, bonusXP });
});

// POST /api/shop/buy
app.post('/api/shop/buy', async (req, res) => {
  const { userId, itemId, price } = req.body;
  
  const { data: user, error } = await supabase.from('users').select('coins').eq('id', userId).single();

  if (error || !user || user.coins < price) {
    return res.status(400).json({ error: "Insufficient coins or user not found" });
  }

  // Deduct coins
  await supabase.from('users').update({ coins: user.coins - price }).eq('id', userId);
  
  // Add to inventory
  await supabase.from('inventory').insert([{ user_id: userId, item_name: itemId, quantity: 1 }]);

  res.json({ success: true, remainingCoins: user.coins - price });
});

// --- SOCKET.IO REAL-TIME LEADERBOARD ---
io.on('connection', (socket) => {
  socket.on('join_leaderboard', async () => {
    // Fetch top 10 from Supabase
    const { data: topUsers } = await supabase
      .from('users')
      .select('id, username, total_xp, current_level')
      .order('total_xp', { ascending: false })
      .limit(10);
    socket.emit('leaderboard_update', topUsers || []);
  });

  socket.on('xp_updated', async () => {
    // When someone earns XP, recalculate and broadcast to EVERYONE
    const { data: topUsers } = await supabase
      .from('users')
      .select('id, username, total_xp, current_level')
      .order('total_xp', { ascending: false })
      .limit(10);
    io.emit('leaderboard_update', topUsers || []);
  });
});

// --- SMART SUGGESTION ENGINE (Replaces AI Oracle) ---
app.post('/api/oracle/suggest', (req, res) => {
  const { recentQuizResults } = req.body;
  
  if (!recentQuizResults || recentQuizResults.length === 0) {
    return res.json({
      weakTopics: ["Unknown"],
      nextSuggestedTopic: "python-basics",
      studyTip: "I need to see your battle scars first! Complete a quest so I can analyze your skills.",
      practiceQuestions: []
    });
  }

  // Sort by lowest percentage to find weakest topics
  const sortedResults = [...recentQuizResults].sort((a, b) => {
    return (a.score / a.totalQuestions) - (b.score / b.totalQuestions);
  });

  const weakest = sortedResults[0];
  const pct = (weakest.score / weakest.totalQuestions) * 100;
  
  let studyTip = "";
  let nextSuggestedTopic = "data-structures"; // Default generic next topic

  // Pure JS Logic replacing AI
  if (pct < 40) {
    studyTip = `Revisit the basics of ${weakest.topic}. You seem to be struggling with the fundamental concepts. Watch your footing!`;
    nextSuggestedTopic = weakest.topic;
  } else if (pct <= 70) {
    studyTip = `Practice more on ${weakest.topic}. You have a good foundation but need to solidify your knowledge to land critical hits.`;
    nextSuggestedTopic = weakest.topic;
  } else {
    studyTip = `You are doing great in ${weakest.topic}! You have mastered this realm and are ready for the next challenge.`;
    // Suggest the next topic in the array (simplified)
    nextSuggestedTopic = "web-development"; 
  }

  const weakTopics = sortedResults.slice(0, 3).map(r => r.topic);
  
  // Fetch 3 actual questions from local DB
  let practiceQuestions = [];
  if (questionBank[weakest.topic]) {
    practiceQuestions = shuffleArray(questionBank[weakest.topic]).slice(0, 3).map(q => ({
      question: q.question,
      answer: q.correct
    }));
  }

  res.json({ weakTopics, nextSuggestedTopic, studyTip, practiceQuestions });
});

// --- GUILD SYSTEM API ---
app.post('/api/guild/create', async (req, res) => {
  const { name, ownerId, invites } = req.body;
  // Simplified: In a real app, insert into a 'guilds' table and send invites
  res.json({ success: true, message: `Guild ${name} created successfully!` });
});

app.post('/api/guild/join', async (req, res) => {
  const { guildId, userId } = req.body;
  res.json({ success: true, message: "Joined guild successfully!" });
});

// --- TEACHER SYSTEM API ---
app.post('/api/teacher/quiz/create', async (req, res) => {
  const { topic, difficulty, teacherId } = req.body;
  
  if (!questionBank[topic]) return res.status(404).json({ error: "Topic not found in Data Bank" });
  
  // Generate quiz WITHOUT AI using the question bank rules
  const allQuestions = questionBank[topic];
  let pool = difficulty === "easy" ? allQuestions.slice(0, 5) : 
             difficulty === "medium" ? allQuestions.slice(3, 8) : 
             allQuestions.slice(5, 10);
             
  const customQuiz = pool.map(q => ({
    question: q.question,
    options: shuffleArray(q.options),
    correct: q.correct
  }));

  // In a real app, save to an "assignments" table here
  res.json({ success: true, assignmentId: `assignment_${Date.now()}`, generatedQuestions: customQuiz });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Backend running on port ${PORT}`));