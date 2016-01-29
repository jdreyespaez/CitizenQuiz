var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
	name:        { type: String, required: true },
	summary:     { type: String },
	fullProject: { type: String, required: true },
	pictures:    { type: String },
	likes:       { type: Number, default: 0 },
	_comments:   [{ type: Schema.ObjectId, ref: 'Comment' }],
	_creator:    { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Project', ProjectSchema);