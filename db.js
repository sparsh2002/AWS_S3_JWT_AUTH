const mongoose = require('mongoose')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const { injectAuthDB } = require('./controllers/authController');
const { injectDumyDB } = require('./controllers/dummyController');

dotenv.config()
const URI = process.env.MONGO_URI
const PROPS = process.env.PROPS
const DB_NAME = process.env.DB_NAME
module.exports.connect = () =>{
    mongoose.connect(URI+DB_NAME+PROPS , {
        useNewUrlParser :true,
        useUnifiedTopology :true,
    }).then(()=>{
        console.log('MongoDB connected successfully!')
    }).catch((error)=>{
        console.log("Error: " , error)
    })

    MongoClient.connect(
        URI+PROPS,
        { 
          useNewUrlParser: true },
      )
        .catch(err => {
          console.error(err.stack)
          process.exit(1)
        })
        .then(async client => {
         await injectAuthDB(client)
         await injectDumyDB(client)
    })
}