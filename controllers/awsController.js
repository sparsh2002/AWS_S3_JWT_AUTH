const bucket = process.env.AWS_BUCKET_NAME
const {uploadFile , getFileStream} = require('../middleware/awsMiddleWare')
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const fsPromises = require('fs').promises 
const FileSchema = require('../models/fileUploadModel')
const AWSupload = async ( req , res) =>{
    const fileList = req.fileList

    const arr = [];
    fileList.forEach(element => {
        arr.push("https://"+bucket+".s3.amazonaws.com"+"/"+element)
    });
    var dir = "public"; 
    await fsPromises.rm(dir, {
        recursive: true
    })

    if (!fs.existsSync(dir+'/images/nov')) {  // CREATE DIRECTORY IF NOT FOUND
        fs.mkdirSync(dir+'/images/nov', { recursive: true });
    }
    
    FileSchema.create({name:'data file' , files:arr})
    .then(res.status(201).json({message:'success' , success:true , files:arr}))
    .catch((e) =>res.status(400).json({message:'an error occured', success:false , error:e}))
}

const AWSFetch = async (req , res) =>{
    const key = req.params.key;
    const readStream = getFileStream(key);
    readStream.pipe(res); 
}

module.exports = {AWSupload , AWSFetch}