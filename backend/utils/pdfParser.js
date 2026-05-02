const pdf = require('pdf-parse');

const parseMCQFromText = (text) => {
  const questions = [];
  
  // Split the text by numbering patterns like "1. ", "2. ", "Q1.", etc.
  // This regex looks for a newline followed by a number and a dot.
  const blocks = text.split(/(?=\n\d+\.\s)/);

  blocks.forEach(block => {
    const lines = block.trim().split('\n').map(l => l.trim()).filter(l => l);
    if (lines.length < 3) return; // Needs at least a question and some options

    // Extract question text
    let questionText = lines[0].replace(/^\d+\.\s*/, '');
    
    let options = [];
    let correct = 'A'; // Default fallback
    let explanation = '';

    lines.slice(1).forEach(line => {
      if (line.match(/^[A-D][\)\.]\s/i)) {
        // Match "A) option" or "A. option"
        options.push(line.replace(/^[A-D][\)\.]\s*/i, ''));
      } else if (line.toLowerCase().startsWith('answer:')) {
        // Match "Answer: B"
        correct = line.replace(/answer:\s*/i, '').trim().charAt(0).toUpperCase();
      } else if (line.toLowerCase().startsWith('explanation:')) {
        explanation = line.replace(/explanation:\s*/i, '').trim();
      } else if (options.length === 0) {
        // If we haven't hit options yet, it might be a multi-line question
        questionText += ' ' + line;
      }
    });

    if (options.length >= 2) {
      questions.push({ question: questionText, options, correct, explanation });
    }
  });

  return questions;
};

const extractQuestionsFromPDF = async (buffer) => {
  try {
    const data = await pdf(buffer);
    return parseMCQFromText(data.text);
  } catch (error) {
    throw new Error("Failed to parse PDF file");
  }
};

module.exports = { extractQuestionsFromPDF };