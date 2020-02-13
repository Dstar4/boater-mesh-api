const express = require('express')
require('dotenv').config()
const Middleware = require('./middleware/middleware')
const AuthenticationMiddleware = require("./middleware/auth");

const app = express()

const router = require('./routes/index')

Middleware(app)
AuthenticationMiddleware(app)
app.use('/api', router)

app.use((error, req, res, next) => {
  console.log(error)
  const status = error.statusCode || 500
  const message = error.message
  const data = error.data
  res.status(status).json({ message: message, data: data })
})
module.exports = app
