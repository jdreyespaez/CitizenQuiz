var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


var UserSchema = new Schema({
	name:           { type: String },
	lastName:       { type: String },
	area:           { type: String },
	profilePic:     { type: String },
	email:			{ type: String },
	username:       { type: String, index: { unique: true }},
	password:       { type: String, required: true, select: false },
	points:         { type: Number, default:0 },
	admin:          { type: Boolean, default: false },
	client:         { type: Boolean, default: false },
	_sentProjects:  [{ type: Schema.ObjectId, ref: 'Project' }],
	_sentThreads:   [{ type: Schema.ObjectId, ref: 'Thread' }],
	_sentComments:  [{ type: Schema.ObjectId, red: 'Comment'}]
});

UserSchema.pre('save', function(next) {
	var user = this;

	if (!user.isModified('password')) return next();

	bcrypt.hash(user.password, null, null, function(err, hash) {

		if (err) return next(err);

		user.password = hash;
		next();
	});
});

UserSchema.methods.comparePassword = function(password) {
	var user = this;
	return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', UserSchema);