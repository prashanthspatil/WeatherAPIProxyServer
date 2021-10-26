const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const exp = require('constants')
require ('dotenv').config()
const PORT = process.env.PORT || 5000

const app = express()

// Allow upto 'max' requests in 'windowMs' window
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 mins (convert to milliseconds)
    max: 5,
})
app.use(limiter)
app.set('trust proxy', 1)

// For the front end to connect to backend: make 'public' folder as static
app.use(express.static('public'))

// Routes
app.use('/api', require('./routes/index'))

// Enable cors
app.use(cors())

app.listen(PORT, () => console.log(`Server running on ${PORT}`))