const bucket = process.env.AWS_BUCKET_NAME
const {uploadFile , getFileStream} = require('../middleware/awsMiddleWare')
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const FileSchema = require('../models/fileUploadModel')
const AWSupload = async ( req , res) =>{
    await uploadFile(req.files); 
    const arr = [];
    req.files.forEach(element => {
        arr.push("https://"+bucket+".s3.amazonaws.com"+"/"+element.filename)
        unlinkFile(element.path);
    })

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