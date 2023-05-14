var express = require("express");
const PostController = require("../controllers/PostController");

var router = express.Router();

router.post("", PostController.postStore);
router.post("/tag", PostController.addTag);
router.delete("/tag", PostController.deleteTag);
router.get("", PostController.getPostsByQueryParams);
module.exports = router;