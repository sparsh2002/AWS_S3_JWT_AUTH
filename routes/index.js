const express = require('express')
const router = express.Router();
const authRoutes = require('./authRoutes')
const validationRoutes = require('./validationRoute')
const awsRoutes = require('./awsRoutes')
router.use('/auth' , authRoutes)
router.use('/validation', validationRoutes)
router.use('/aws' , awsRoutes)
module.exports = router