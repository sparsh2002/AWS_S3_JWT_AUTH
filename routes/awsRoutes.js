var express = require("express");
var router = express.Router();
const upload = require("../common");
const { AWSupload, AWSFetch } = require("../controllers/awsController");
const { uploadFile } = require("../middleware/awsMiddleWare");


// router.post("/multiple", upload.array("images"), AWSupload );
router.post("/multiple", upload.array("images"), uploadFile  , AWSupload );



router.get("/images/:key", AWSFetch);
module.exports = router;