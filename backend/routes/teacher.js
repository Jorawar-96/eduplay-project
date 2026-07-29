const express = require('express');
let supabase = null;
try {
  const { createClient } = require('@supabase/supabase-js');
  if (process.env.SUPABASE_URL && (process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY)) {
    supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY);
  } else {
    console.warn('[routes/teacher] Supabase not configured. Teacher routes will return 503 until configured.');
  }
} catch (err) {
  console.error('[routes/teacher] Failed to require supabase client:', err.message);
}

const router = express.Router();

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

router.post('/deploy-assignment', async (req, res) => {
  try {
    const { topic, difficulty, teacherId, className } = req.body;

    if (!topic || !difficulty) {
      return res.status(400).json({ error: 'Topic and difficulty are required.' });
    }
    if (!teacherId || !UUID_RE.test(String(teacherId))) {
      return res.status(400).json({
        error: 'Invalid teacher id. Log in as a teacher and deploy again.',
      });
    }

    const { data, error } = await supabase
      .from('assignments')
      .insert([{
        topic,
        difficulty,
        teacher_id: teacherId,
        class_name: className || 'Class Assignment',
        active: true
      }])
      .select()
      .single();
    
    if (error) throw error;
    res.json({ success: true, assignment: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/assignments', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('assignments')
      .select('*')
      .eq('active', true)
      .order('deployed_at', { ascending: false });
    
    if (error) throw error;
    // Returning an array directly to match the frontend expectations in app/boss-fight/page.tsx
    res.json(data || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;