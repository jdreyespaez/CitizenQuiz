var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuizSchema = new Schema({
	name:           { type: String, required: true },
	points:         { type: Number, default: 0},
	_questions:      [{ type: Schema.ObjectId, ref: 'Pregunta' }],
	_parentMaterial: { type: Schema.ObjectId, ref: 'Material' }
});

module.exports = mongoose.model('Quiz', QuizSchema);
