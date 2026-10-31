
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { portfolioAssistantPrompt } from './portfolioKnowledge.js'

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

// AI CHAT API
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body

    if (typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        error: 'Please enter a message.',
      })
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({
        error: 'OpenRouter API key is not configured.',
      })
    }

    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
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
              content: portfolioAssistantPrompt,
            },
            {
              role: 'user',
              content: message.trim(),
            },
          ],
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error('OpenRouter error:', data)

      return res.status(response.status).json({
        error: data?.error?.message ||
          'The AI service could not answer. Try again.',
      })
    }

    const answer = data?.choices?.[0]?.message?.content

    if (!answer) {
      return res.status(502).json({
        error: 'The model returned an empty answer.',
      })
    }

    return res.json({ reply: answer })

  } catch (error) {
    console.error('Chat error:', error)

    return res.status(500).json({
      error: 'Could not connect to the AI service.',
    })
  }
})

// CONTACT FORM API
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof subject !== 'string' ||
      typeof message !== 'string' ||
      !name.trim() ||
      !email.trim() ||
      !subject.trim() ||
      !message.trim()
    ) {
      return res.status(400).json({
        error: 'Please fill in all fields.',
      })
    }

    if (
      name.length > 100 ||
      email.length > 254 ||
      subject.length > 200 ||
      message.length > 5000
    ) {
      return res.status(400).json({
        error: 'One or more fields are too long.',
      })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({
        error: 'Please enter a valid email address.',
      })
    }

    if (!process.env.RESEND_API_KEY || !process.env.GMAIL_USER) {
      return res.status(500).json({
        error: 'Contact email service is not configured.',
      })
    }

    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [process.env.GMAIL_USER],
      replyTo: email.trim(),
      subject: `Portfolio Contact: ${subject.trim()}`,
      text: [
        `Name: ${name.trim()}`,
        `Email: ${email.trim()}`,
        `Subject: ${subject.trim()}`,
        '',
        'Message:',
        message.trim(),
      ].join('\n'),
    })

    if (error) {
      console.error('Resend email error:', error)

      return res.status(502).json({
        error: 'Unable to send your message right now. Please try again later.',
      })
    }

    console.log('Contact email sent successfully:', data?.id)

    return res.json({
      success: true,
      message: 'Your message has been sent successfully!',
    })

  } catch (error) {
    console.error('Contact form error:', error)

    return res.status(500).json({
      error: 'Unable to send your message right now. Please try again later.',
    })
  }
})

// START SERVER
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Portfolio AI backend running on port ${PORT}`)
})
