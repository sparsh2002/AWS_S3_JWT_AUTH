const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY 
const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});


// function uploadFile(file) {
//     const oT = typeof file
//     if(oT==='object'){
//         const arr = []
//         file.forEach(element => {
//             const fileStream = fs.createReadStream(element.path);
//             const uploadParams = {
//             Bucket: bucketName,
//             Body: fileStream,
//             Key: element.filename,
//             };
//             s3.upload(uploadParams).promise()
//             console.log(element.filename)
//             arr.push(element.filename); 
//         });
//         // console.log('ho gaya')
//         return arr;
//     }
//     else{
//         const fileStream = fs.createReadStream(file.path);
//         const uploadParams = {
//         Bucket: bucketName,
//         Body: fileStream,
//         Key: file.filename,
//         };
//         return s3.upload(uploadParams).promise(); // this will upload file to S3
//     }
//   }

const uploadFile = async(req , res , next) =>{
  try {
    const arr = []
    req.files.forEach(element => {
      const fileStream = fs.createReadStream(element.path);
      const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: element.filename,
      };
      
      s3.upload(uploadParams).promise()
      // if(fs.existsSync(element.path)){
      //   // console.log('haan')
      //   unlinkFile(element.path)
      // }
      arr.push(element.filename); // this will upload file to S3
    });
    
    // unlinkFile(element.path)

    req.fileList = arr
    next();
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error });
  }
}

function getFileStream(fileKey) {
    const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };
  return s3.getObject(downloadParams).createReadStream();
}
  
  module.exports = { uploadFile ,getFileStream };
