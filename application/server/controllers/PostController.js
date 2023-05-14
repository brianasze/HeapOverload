const PostModel = require("../models/PostModel");
var moment = require('moment');
const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);


function PostData(data) {
	this.id = data._id;
	this.title = data.title;
	this.author = data.author;
	this.content = data.content;
	this.replies = data.replies;
	this.tag = data.tag;
	this.date = data.date;
}


exports.postStore = [
	body("title").isLength({ min: 1 }).trim().withMessage("title must not be empty."),
	body("author", "author must not be empty.").isLength({ min: 1 }).trim(),
	body("content", "content must not be empty.").isLength({ min: 1 }).trim(),
    sanitizeBody("title").escape(),
    sanitizeBody("author").escape(),
	sanitizeBody("content").escape(),

	(req, res) => {
		try {
			const errors = validationResult(req);


			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}
			else {
				var post = new PostModel(
					{
						title: req.body.title,
						author: req.body.author,
						content: req.body.content,
						tag: req.body.tag,
                        date: moment().format('DD-MM-YYYY, h:mm:ss a'),
                        
					});
					console.log(post);

                   post.save(function (err) {
					if (err) { return apiResponse.ErrorResponse(res, err); }
					let postData = new PostData(post);
					return apiResponse.successResponseWithCreate(res, "Post added successfully", postData);
				});
			}
		} catch (err) {
			console.log(err);
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];


exports.addTag = [
	body("tag").isLength({ min: 1 }).trim().withMessage("tag must not be empty."),
	body("post_id", "post must not be empty.").isLength({ min: 1 }).trim(),
	body("author", "author must not be empty.").isLength({ min: 1 }).trim(),
    sanitizeBody("tag").escape(),
    sanitizeBody("post_id").escape(),
	sanitizeBody("author").escape(),
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
								if (post.author !== req.body.author) {
									return apiResponse.notFoundResponse(res, "You dont have permission to add tag");
								} else {
									console.log(post.tag);
									const index = post.tag.indexOf(req.body.tag);
									if (index === -1) {
										post.tag.push(req.body.tag);
										console.log(post.tag);
										PostModel.findByIdAndUpdate(req.body.post_id, post, {}, function (err) {
											if (err) {
												return apiResponse.ErrorResponse(res, err);
											}else {
												return apiResponse.successResponseWithCreate(res, "Tag added to post Successfully.");
											}
										});
									} else {
										return apiResponse.validationErrorWithData(res, "Incoming tag already exist in the Post", "Incoming tag already exist in the Post");
									}
									
								}
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

exports.deleteTag = [
	body("tag").isLength({ min: 1 }).trim().withMessage("tag must not be empty."),
	body("post_id", "post must not be empty.").isLength({ min: 1 }).trim(),
	body("author", "author must not be empty.").isLength({ min: 1 }).trim(),
    sanitizeBody("tag").escape(),
    sanitizeBody("post_id").escape(),
	sanitizeBody("author").escape(),
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
								if (post.author !== req.body.author) {
									return apiResponse.notFoundResponse(res, "You dont have permission to add tag");
								} else {
									console.log(post.tag);

									const index = post.tag.indexOf(req.body.tag);
									if (index > -1) { // only splice array when item is found
										post.tag.splice(index, 1); // 2nd parameter means remove one item only
										console.log(post.tag);

										PostModel.findByIdAndUpdate(req.body.post_id, post, {}, function (err) {
											if (err) {
												return apiResponse.ErrorResponse(res, err);
											}else {
												return apiResponse.successResponseWithCreate(res, "Tag removed from post Successfully.");
											}
										});
									
									} else {
										return apiResponse.validationErrorWithData(res, "Tag name not found in the Post", "Tag name not found in the Post");
									}

									
								}
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

exports.getPostsByQueryParams = [
	function (req, res) {
		console.log(req.query);
		if(req.query.title) {
			try {
				PostModel.find({title: {$regex: req.query.title, $options: 'i'}}).populate('replies')
				
				.then((post) => {
					let postData = new PostData(post);
					if (post !== null) {
					
						return apiResponse.successResponseWithData(res, "Get post details operation success", post);
					} else {
						return apiResponse.successResponseWithData(res, "Operation success bb", {});
					}
				});
	
				
			} catch (err) {
				return apiResponse.ErrorResponse(res, err);
			}
		} else if(req.query.content){
			try {
				PostModel.find({content: {$regex: req.query.content, $options: 'i'}}, "_id title author content replies tag date")
				.populate('replies')
				.then((post) => {
					
					let postData = new PostData(post);
	
					if (post !== null) {
					
						return apiResponse.successResponseWithData(res, "Get post details operation success", post);
					} else {
						return apiResponse.successResponseWithData(res, "Operation success bb", {});
					}
				});
	
				
			} catch (err) {
				return apiResponse.ErrorResponse(res, err);
			}
		} else if(req.query.tag){
			try {
				PostModel.find({tag: {$regex: req.query.tag, $options: 'i'}}, "_id title author content replies tag date")
				.populate('replies')
				.then((post) => {
					
					let postData = new PostData(post);
	
					if (post !== null) {
					
						return apiResponse.successResponseWithData(res, "Get post details operation success", post);
					} else {
						return apiResponse.successResponseWithData(res, "Operation success bb", {});
					}
				});
	
				
			} catch (err) {
				return apiResponse.ErrorResponse(res, err);
			}
		}
		
	}
];
