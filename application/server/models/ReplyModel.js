var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ReplySchema = new Schema({
	comment: {type: String, required: true},
	date: { type: String, required: true},
    post: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "post"
	},
	comment_by: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
    liked_by: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}],
    disliked_by: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}]
}, {timestamps: true});

ReplySchema.virtual('postId', {
    ref: 'post',
    localField: 'post',
    foreignField: '_id',
    justOne: false // set true for one-to-one relationship
})

module.exports = mongoose.model("reply", ReplySchema);