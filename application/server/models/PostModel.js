var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PostSchema = new Schema({
	title: {type: String, required: true},
	author: {type: String, required: true},
	content: {type: String, required: true},
	tag: [{
		type: [String], 
		default: [] ,
		required: true
	}],
	date: { type: String, required: true},
	replies: [{
		type: Schema.Types.ObjectId,
		ref: "reply"
	}]
}, {timestamps: true});
// PostSchema.virtual('replies', {
//     ref: 'reply',
//     localField: '_id',
//     foreignField: 'post_id',
//     justOne: false // set true for one-to-one relationship
// })
module.exports = mongoose.model("post", PostSchema);