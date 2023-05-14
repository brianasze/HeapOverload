var express = require("express");
const ReplyController = require("../controllers/ReplyController");

var router = express.Router();

router.post("", ReplyController.addReply);
router.delete("", ReplyController.deleteReply);
router.post("/like", ReplyController.likeReply);
router.get("/:id", ReplyController.getReply);
module.exports = router;