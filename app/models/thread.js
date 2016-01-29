var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ThreadSchema = new Schema({
	title:       { type: String, required: true },
	content:     { type: String, required: true },
	likes:       { type: Number, default: 0 },
	_comments:   [{ type: Schema.ObjectId, ref: 'Comment' }],
	_creator:    { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Thread', ThreadSchema);