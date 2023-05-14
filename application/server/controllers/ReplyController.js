const ReplyModel = require("../models/ReplyModel");
const PostModel = require("../models/PostModel");
const UserModel = require("../models/UserModel");
var moment = require('moment');
const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);



function ReplyData(data) {
	this.id = data._id;
	this.comment = data.comment;
	this.comment_by = data.comment_by;
	this.post = data.post;
	this.liked_by = data.liked_by;
    this.disliked_by = data.disliked_by;
	this.date = data.date;
}


exports.addReply = [
	body("comment").isLength({ min: 1 }).trim().withMessage("message must not be empty."),
	body("post_id", "post must not be empty.").isLength({ min: 1 }).trim(),
	body("comment_by", "comment_by must not be empty.").isLength({ min: 1 }).trim(),
    sanitizeBody("comment").escape(),
    sanitizeBody("post_id").escape(),
	sanitizeBody("comment_by").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);


			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}
			else {

				if (!mongoose.Types.ObjectId.isValid(req.body.post_id) && !mongoose.Types.ObjectId.isValid(req.body.comment_by)) {
					return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
				} else {
					PostModel.findById(req.body.post_id, function (err, post) {
						if (post === null) {
							return apiResponse.notFoundResponse(res, "Post not exists with this id");
						} else {
							UserModel.findById(req.body.comment_by, function (err, user) {
								if (user === null) {
									return apiResponse.notFoundResponse(res, "User not exists with this id");
								} else {
									var reply = new ReplyModel(
										{
											comment: req.body.comment,
											post: post._id,
											comment_by: user._id,
											date: moment().format('DD-MM-YYYY, h:mm:ss a'),
										});
										
									reply.save(function (err) {
										if (err) { return apiResponse.ErrorResponse(res, err); }
										let replyData = new ReplyData(reply);
										return apiResponse.successResponseWithCreate(res, "Reply added successfully", replyData);
									});

									post.replies.push(reply._id);
									PostModel.findByIdAndUpdate(req.body.post_id, post, {}, function (err) {
										if (err) {
											return apiResponse.ErrorResponse(res, err);
										} 
									});
								}
							});
						}
					});
				}
			}
		} catch (err) {
			console.log(err);
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];


exports.likeReply = [
	body("reply_id").isLength({ min: 1 }).trim().withMessage("reply_id must not be empty."),
	body("post_id", "post_id must not be empty.").isLength({ min: 1 }).trim(),
	body("user_id", "user_id must not be empty.").isLength({ min: 1 }).trim(),
    sanitizeBody("reply_id").escape(),
    sanitizeBody("post_id").escape(),
	sanitizeBody("user_id").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);


			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}
			else {

				if (!mongoose.Types.ObjectId.isValid(req.body.post_id) && !mongoose.Types.ObjectId.isValid(req.body.user_id) && !mongoose.Types.ObjectId.isValid(req.body.reply_id)) {
					return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
				} else {
					PostModel.findById(req.body.post_id, function (err, post) {
						
						if (post === null) {
							return apiResponse.notFoundResponse(res, "Post not exists with this id");
						} else {

							UserModel.findById(req.body.user_id, function (err, user) {
								if (user === null) {
									return apiResponse.notFoundResponse(res, "User not exists with this id");
								} else {
									ReplyModel.findById(req.body.reply_id, function (err, reply) {
										if (reply===null) {
											return apiResponse.notFoundResponse(res, "Reply not exists with this id");
										} else {
											if(!reply.liked_by.includes(user._id)){
												reply.liked_by.push(user._id);
												ReplyModel.findByIdAndUpdate(req.body.reply_id, reply, {}, function (err) {
													if (err) {
														return apiResponse.ErrorResponse(res, err);
													} else {
														return apiResponse.successResponseWithCreate(res, "Like added to reply Successfully.");
													}
												});
											} else {
												return apiResponse.successResponse(res, "Already user liked the post.");
											}
											
										}
									});
									

									
								}
							});
						}
					});
				}
			}
		} catch (err) {
			console.log(err);
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];



exports.deleteReply = [
	body("reply_id").isLength({ min: 1 }).trim().withMessage("reply_id must not be empty."),
	body("post_id", "post_id must not be empty.").isLength({ min: 1 }).trim(),
	body("user_id", "user_id must not be empty.").isLength({ min: 1 }).trim(),
    sanitizeBody("reply_id").escape(),
    sanitizeBody("post_id").escape(),
	sanitizeBody("user_id").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);


			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}
			else {

				if (!mongoose.Types.ObjectId.isValid(req.body.post_id) && !mongoose.Types.ObjectId.isValid(req.body.user_id) && !mongoose.Types.ObjectId.isValid(req.body.reply_id)) {
					return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
				} else {
					PostModel.findById(req.body.post_id, function (err, post) {
						
						if (post === null) {
							return apiResponse.notFoundResponse(res, "Post not exists with this id");
						} else {

							UserModel.findById(req.body.user_id, function (err, user) {
								if (user === null) {
									return apiResponse.notFoundResponse(res, "User not exists with this id");
								} else {
									ReplyModel.findById(req.body.reply_id, function (err, reply) {
										if (reply===null) {
											return apiResponse.notFoundResponse(res, "Reply not exists with this id");
										} else if(reply.comment_by._id != req.body.user_id){
											return apiResponse.ErrorResponse(res, "User dont have permission to delete reply");
										} else {
											PostModel.updateOne({ _id: req.body.post_id }, {
												$pull: {
													replies: req.body.reply_id,
												},
											});
											ReplyModel.findByIdAndRemove(req.body.reply_id, function (err) {
												if (err) {
													return apiResponse.ErrorResponse(res, err);
												} else {
													return apiResponse.successResponseWithDelete(res, "Reply deleted Successfully.");
												}
											});
										}
									});
									

									
								}
							});
						}
					});
				}
			}
		} catch (err) {
			console.log(err);
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];


exports.getReply = [
	function (req, res) {
		try {
			ReplyModel.findById({_id: req.params.id})
			 .populate('comment_by')
			 .populate('post')
			 .populate('disliked_by')
			 .populate('liked_by')
			.then((reply) => {
				return apiResponse.successResponseWithData(res, "Get reply by id - operation success", reply);
				
			});
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

exports.replyList = [
	function (req, res) {
		try {
			
			ReplyModel.find({}, "_id comment post comment_by date disliked_by liked_by")
			.populate('comment_by')
			//.populate('post')
			.populate('disliked_by')
			.populate('liked_by').then((reply) => {
				if (reply.length > 0) {
					return apiResponse.successResponseWithData(res, "Get all reply list - operation success", reply);
				} else {
					return apiResponse.successResponseWithData(res, "Operation success", []);
				}
			});
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];