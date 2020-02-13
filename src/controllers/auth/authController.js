const router = require('express').Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { validationResult } = require('express-validator')

const Users = require('../../models/Users')
const chalk = require('chalk')
const bcrypt = require('bcryptjs')

const {
  Model,
  ForeignKeyViolationError,
  ValidationError
} = require('objection')

router.post('/sign-up', async (req, res) => {
  let { email, password } = req.body

  try {
    password = await bcrypt.hash(password, 12)
    const data = await Users.query().insert({
      email,
      password
    })
    console.log('data', data)
    const token = generateAccessToken(data)
    req.session.userId = data.id
    res.status(200).json(token)
  } catch (err) {
    if (err instanceof ValidationError) {
      console.error(chalk.default.yellow(err))
      res.status(400).json({ error: err.data })
    } else {
      console.log(chalk.default.red(err))
      res
        .status(400)
        .json({ message: 'Unable to register new user', error: err })
    }
  }
})

router.post('/sign-in', async (req, res) => {
  let { email, password } = req.body
  try {
    const data = await Users.query()
      .select('email', 'password', 'id')
      .where({ email: email })
      .first()

    console.log('data', data)
    const isEqual = await bcrypt.compare(password, data.password)
    if (isEqual) {
      const token = generateAccessToken(data)
      req.session.userId = data.id
      res.status(200).json(token)
    } else {
      res.status(400).json('Incorrect Password')
    }
  } catch (err) {
    res.status(400).json('unable to sign in')
  }
})

function generateAccessToken (user) {
  if (!user) {
    throw new Error('Invalid user')
  }
  let userInfo = user.toJSON()
  delete userInfo.password
  let payload = {
    user: userInfo
  }
  const token = jwt.sign(payload, process.env.AUTH_SECRET, {
    algorithm: 'HS256',
    issuer: process.env.TOKEN_ISSUER,
    subject: `${user.id}`
  })
  return token
}
module.exports = router
