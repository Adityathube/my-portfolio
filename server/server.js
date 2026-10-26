
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001


const allowedOrigins = [
  'http://localhost:5173',
  'https://my-portfolio-six-tau-80.vercel.app',
  'https://my-portfolio-3mq11ivu9-hydra-a99b.vercel.app',
]

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    return callback(new Error('Origin not allowed by CORS'))
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use(express.json({ limit: '20kb' }))

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body

    if (typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Please enter a message.' })
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({ error: 'OpenRouter API key is not configured.' })
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.SITE_URL || 'http://localhost:5173',
        'X-Title': 'Aditya Thube Portfolio',
      },
      body: JSON.stringify({
        model: 'openrouter/free',
        messages: [
          {
            role: 'system',
            content: `You are the Portfolio Assistant for Aditya Thube.
Answer questions about his portfolio accurately and concisely.

Facts:
- He is a Computer Science Engineering student.
- Interests: web development, databases, cybersecurity.
- Skills: Java, JavaScript, SQL, HTML, React, Tailwind CSS, Vite, Git, GitHub, DBMS, Computer Networks, Power BI.
- Project: Honeypot Management System.
- Portfolio: React and Vite, designed to resemble a developer workspace.
- Internship: AI/ML & Data Science Intern at Sumago Infotech Pvt. Ltd.
- GitHub: https://github.com/Adityathube
- Email: adityathube1901@gmail.com

The website has Explorer, Search, Source Control, Extensions, and editor tabs for portfolio sections.
Do not invent projects, qualifications, or features. If you do not know something, say so.
Keep answers friendly and focused on the visitor's question.`,
          },
          { role: 'user', content: message.trim() },
        ],
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('OpenRouter error:', data)
      return res.status(response.status).json({
        error: data?.error?.message || 'The AI service could not answer. Try again.',
      })
    }

    const answer = data?.choices?.[0]?.message?.content

    if (!answer) {
      return res.status(502).json({ error: 'The model returned an empty answer.' })
    }

    res.json({ reply: answer })
  } catch (error) {
    console.error('Chat error:', error)
    res.status(500).json({ error: 'Could not connect to the AI service.' })
  }
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Portfolio AI backend running on port ${PORT}`)
})

