var express = require("express");
var router = express.Router();
const upload = require("../common");
const { uploadFile , getFileStream } = require("../controllers/aws");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

// Single file Upload - image key should be passed postman
router.post("/single", upload.single("image"), async (req, res, next) => {

  const result = await uploadFile(req.file);  // Calling above function in s3.js

  await unlinkFile(req.file.path);
  res.send({
    status: "success",
    message: "File uploaded successfully",
    data: req.file,
  });

});
// Multiple files Upload - images key should be passed in postman
router.post("/multiple", upload.array("images"), async (req, res) => {
  const result = await uploadFile(req.files); 
  req.files.forEach(element => {
    unlinkFile(element.path);
  })
  res.send({
    status: "success",
    message: "Files uploaded successfully",
    data: req.files,
  });
});


router.get("/images/:key", (req, res) => {
    const key = req.params.key;
    const readStream = getFileStream(key);
    readStream.pipe(res);  // this line will make image readable
  });
module.exports = router;