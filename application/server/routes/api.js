var express = require("express");
var authRouter = require("./auth");
var postRouter = require("./post");
var replyRouter = require("./reply");
var app = express();

app.use("/user/", authRouter);
app.use("/post/", postRouter);
app.use("/reply/", replyRouter);
module.exports = app;