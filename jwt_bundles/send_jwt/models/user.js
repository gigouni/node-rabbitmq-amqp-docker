const MONGOOSE = require('mongoose');
let Schema = MONGOOSE.Schema;

// set up a MONGOOSE model
module.exports = MONGOOSE.model('User', new Schema({
	name: String, 
	password: String, 
	admin: Boolean 
}));