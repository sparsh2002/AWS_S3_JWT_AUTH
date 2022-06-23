const express = require('express');
const { singupPost, loginPost } = require('../controllers/authController');
const router = express.Router()

router.post('/signup' , singupPost)
router.post('/login' , loginPost)

module.exports = router;