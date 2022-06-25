var express = require("express");
var router = express.Router();
const upload = require("../common");
const { AWSupload, AWSFetch } = require("../controllers/awsController");


router.post("/multiple", upload.array("images"), AWSupload );


router.get("/images/:key", AWSFetch);
module.exports = router;