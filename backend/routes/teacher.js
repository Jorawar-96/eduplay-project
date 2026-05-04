const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

router.post('/deploy-assignment', async (req, res) => {
  try {
    const { topic, difficulty, teacherId, className } = req.body;
    
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