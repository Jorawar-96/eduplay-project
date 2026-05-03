const express = require('express');
const router = express.Router();

const deployedAssignments = [];

router.post('/deploy-assignment', (req, res) => {
  const { topic, difficulty, teacherId, className } = req.body;
  
  const assignment = {
    id: Date.now().toString(),
    topic,
    difficulty,
    className: className || "Class Assignment",
    deployedAt: new Date(),
    active: true
  };
  
  deployedAssignments.push(assignment);
  
  res.json({ success: true, assignment });
});

router.get('/assignments', (req, res) => {
  const activeAssignments = deployedAssignments.filter(a => a.active);
  res.json({ assignments: activeAssignments });
});

module.exports = router;