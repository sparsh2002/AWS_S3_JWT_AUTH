const express = require('express')
const router = express.Router();
const authRoutes = require('./authRoutes')
const validationRoutes = require('./validationRoute')
router.use('/auth' , authRoutes)
router.use('/validation', validationRoutes)
module.exports = router