const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
require("dotenv").config();
const app = express()
const PORT = process.env.PORT

const db = require('./db.js')

db.connect()
const router = require('./routes/index')

// middle ware
app.use(bodyParser.json({limit:"50mb"}))
app.use(bodyParser.urlencoded({extended:true, limit:"50mb"}))

// cors
app.use(cors())

app.use((req, res , next) =>{
    req.header("Access-Control-Allow-Origin" , "*")
    req.header("Access-Control-Allow-Headers" , "*")
    next()
})

app.use("/api/v1" , router)

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
