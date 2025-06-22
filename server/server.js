import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import Item from './models/Item.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Check for required environment variables
if (!process.env.MONGODB_URI || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error('❌ Missing environment variables. Check .env file.')
  process.exit(1)
}

// Middleware
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err)
    process.exit(1)
  })

// Nodemailer setup
let transporter
try {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })
  console.log('✅ Email transporter configured')
} catch (error) {
  console.error('❌ Failed to configure email transporter:', error)
  process.exit(1)
}

// Get all items
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 })
    res.json(items)
  } catch (error) {
    console.error('❌ Fetch items error:', error)
    res.status(500).json({ error: 'Failed to fetch items' })
  }
})

// Get single item
app.get('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
    if (!item) {
      return res.status(404).json({ error: 'Item not found' })
    }
    res.json(item)
  } catch (error) {
    console.error('❌ Fetch item error:', error)
    res.status(500).json({ error: 'Failed to fetch item' })
  }
})

// Add new item
app.post('/api/items', async (req, res) => {
  try {
    const { name, type, description, coverImage, additionalImages } = req.body

    if (!name || !type || !description || !coverImage) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const item = new Item({
      name,
      type,
      description,
      coverImage,
      additionalImages: additionalImages || []
    })

    await item.save()
    res.status(201).json(item)
  } catch (error) {
    console.error('❌ Create item error:', error)
    res.status(500).json({ error: 'Failed to create item' })
  }
})

// Send enquiry email
app.post('/api/enquire', async (req, res) => {
  try {
    const { itemId, itemName, userEmail, userMessage } = req.body

    const safeEmail = userEmail || 'Not provided'
    const safeMessage = userMessage
      ? userMessage.replace(/</g, '&lt;').replace(/>/g, '&gt;')
      : 'No message provided.'

    const mailOptions = {
      from: `"ItemHub Enquiry" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `🛒 New Enquiry for: ${itemName || 'Unnamed Item'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
          <h2 style="color: #4f46e5;">📩 New Enquiry Received</h2>
          <p><strong>Item Name:</strong> ${itemName || 'Not specified'}</p>
          <p><strong>Item ID:</strong> ${itemId || 'Not provided'}</p>
          <p><strong>Sender Email:</strong> ${safeEmail}</p>
          <div style="margin-top: 20px;">
            <p><strong>Message:</strong></p>
            <div style="background-color: #f1f5f9; padding: 16px; border-left: 4px solid #4f46e5; border-radius: 6px;">
              ${safeMessage}
            </div>
          </div>
          <p style="margin-top: 30px; color: #666; font-size: 0.85rem;">
            This enquiry was submitted from your <strong>ItemHub</strong> website.
          </p>
        </div>
      `
    }

    await transporter.sendMail(mailOptions)
    res.json({ success: true, message: 'Enquiry email sent successfully!' })
  } catch (error) {
    console.error('❌ Email sending error:', error)
    res.status(500).json({ error: 'Failed to send enquiry' })
  }
})

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
})
