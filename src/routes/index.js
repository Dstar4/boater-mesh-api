const router = require('express').Router()

const authController = require('../controllers/auth/authController')
const gaugesController = require('../controllers/gauges/gaugesController')
// Auth
router.use('/auth', authController)
router.use('/gauges', gaugesController)


// Routes to get gauge data from db

module.exports = router
