const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY 
const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});


function uploadFile(file) {
    const oT = typeof file
    if(oT==='object'){
        file.forEach(element => {
            const fileStream = fs.createReadStream(element.path);
            const uploadParams = {
            Bucket: bucketName,
            Body: fileStream,
            Key: element.filename,
            };
            s3.upload(uploadParams).promise(); // this will upload file to S3
        });
        // console.log('ho gaya')
        return;
    }
    else{
        const fileStream = fs.createReadStream(file.path);
        const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename,
        };
        return s3.upload(uploadParams).promise(); // this will upload file to S3
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
