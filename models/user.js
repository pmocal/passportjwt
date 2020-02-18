var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema(
	{
		email: {type: String, required: true},
		password: { type: String, required: true },
	},
	{
		collection: 'users'
	}
)

module.exports = mongoose.model('UserModel', UserSchema);