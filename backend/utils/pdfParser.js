const PDFParser = require('pdf2json')

const parsePDFBuffer = (buffer) => {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser()
    
    pdfParser.on('pdfParser_dataReady', (pdfData) => {
      try {
        let text = ''
        pdfData.Pages.forEach(page => {
          page.Texts.forEach(textItem => {
            textItem.R.forEach(r => {
              text += decodeURIComponent(r.T) + ' '
            })
          })
          text += '\n'
        })
        const questions = extractMCQFromText(text)
        resolve(questions)
      } catch (err) {
        reject(err)
      }
    })
    
    pdfParser.on('pdfParser_dataError', reject)
    pdfParser.parseBuffer(buffer)
  })
}

const extractMCQFromText = (text) => {
  const questions = []
  const lines = text.split('\n').filter(l => l.trim())
  
  let currentQuestion = null
  let options = []
  let correctAnswer = 'A'
  
  lines.forEach(line => {
    line = line.trim()
    
    const qMatch = line.match(/^(\d+)[.)]\s+(.+)/)
    if (qMatch) {
      if (currentQuestion && options.length >= 2) {
        questions.push({
          id: questions.length + 1,
          question: currentQuestion,
          options: options.slice(0, 4),
          correct: correctAnswer,
          explanation: ''
        })
      }
      currentQuestion = qMatch[2]
      options = []
      correctAnswer = 'A'
      return
    }
    
    const optMatch = line.match(/^[AaBbCcDd][.)]\s+(.+)/)
    if (optMatch && currentQuestion) {
      options.push(optMatch[1])
      return
    }
    
    const ansMatch = line.match(/^(?:answer|ans|correct)[:\s]+([AaBbCcDd])/i)
    if (ansMatch) {
      correctAnswer = ansMatch[1].toUpperCase()
    }
  })
  
  if (currentQuestion && options.length >= 2) {
    questions.push({
      id: questions.length + 1,
      question: currentQuestion,
      options: options.slice(0, 4),
      correct: correctAnswer,
      explanation: ''
    })
  }
  
  return questions
}

module.exports = { parsePDFBuffer, extractMCQFromText }