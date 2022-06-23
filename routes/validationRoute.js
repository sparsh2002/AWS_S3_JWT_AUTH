const express = require('express');
const router = express.Router()
const { addEntry } = require('../controllers/dummyController');
const auth = require('../middleware/authMiddleware');


router.post('/verify' , auth , addEntry)

module.exports = router