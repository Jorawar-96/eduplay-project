const express = require('express');
const multer = require('multer');
const { createClient } = require('@supabase/supabase-js');
const authMiddleware = require('../middleware/auth');
const { parsePDFBuffer } = require('../utils/pdfParser');
const router = express.Router();
// Use memory storage so we don't have to save temporary files to disk
const upload = multer({ storage: multer.memoryStorage() });

const supabaseUrl = process.env.SUPABASE_URL || 'https://xyzcompany.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'public-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

// POST /api/teacher/upload-pdf
router.post('/upload-pdf', authMiddleware, upload.single('pdf'), async (req, res) => {
  try {
    // 1. Verify user is a teacher
    if (req.user.role !== 'teacher') {
      return res.status(403).json({ error: "Unauthorized. Only teachers can upload quizzes." });
    }

    // 2. Validate input
    const { category } = req.body;
    if (!req.file) return res.status(400).json({ error: "No PDF file uploaded" });
    if (!category) return res.status(400).json({ error: "Category is required" });

    // 3. Extract text and parse questions
    const extractedQuestions = await parsePDFBuffer(req.file.buffer);;
    if (extractedQuestions.length === 0) {
      return res.status(400).json({ error: "Could not parse PDF. Make sure MCQs are clearly formatted." });
    }

    // 4. Save to Supabase
    const inserts = extractedQuestions.map(q => ({
      teacher_id: req.user.userId,
      category: category,
      question: q.question,
      options: q.options,
      correct: q.correct,
      explanation: q.explanation || ''
    }));

    const { error } = await supabase.from('custom_questions').insert(inserts);
    if (error) throw error;

    res.json({ success: true, questionsAdded: extractedQuestions.length, questions: extractedQuestions });
  } catch (error) {
    res.status(500).json({ error: error.message || "Failed to process PDF" });
  }
});

module.exports = router;