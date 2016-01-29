var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PreguntaSchema = new Schema({
	question:    { type: String, required: true },
	correct:     { type: Boolean, required: true, default: false },
	_parentQuiz: { type: Schema.ObjectId, ref: 'Quiz' }
});

module.exports = mongoose.model('Pregunta', PreguntaSchema);