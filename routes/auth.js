const authController = require('../controllers/authController')

const express = require('express')
const router = express.Router()

router.post('/login', authController.authorization)
module.exports = router