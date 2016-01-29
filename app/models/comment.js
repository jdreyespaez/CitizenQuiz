var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
	comment:     { type: String, required: true },
	likes:       { type: Number, default: 0 },
	_creator:    { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Comment', CommentSchema);