var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MaterialSchema = new Schema({
	title:       { type: String, required: true },
	content:     { type: String, required: true },
	rewardPoints:{ type: Number, required: true },
	area:        { type: String, required: true },
	allTimeViews:{ type: Number, default: 0 },
	monthViews:  { type: Number, default: 0 },
	_quiz:      { type: Schema.ObjectId, ref: 'Quiz' }
});

module.exports = mongoose.model('Material', MaterialSchema);