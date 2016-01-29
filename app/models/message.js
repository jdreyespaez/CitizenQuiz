var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
	message:     { type: String, required: true },
	createdOn:   { type: Date, default: Date.now() },
	visible:     { type: Boolean, default: false }
});

module.exports = mongoose.model('Message',	MessageSchema);