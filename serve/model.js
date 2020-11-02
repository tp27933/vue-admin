
var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
if(process.env.NODE_ENV == "production"){
  mongoose.connect('mongodb://localhost/helloWorld');//此处改为mongodb Atlas上的字段码
}else{
  mongoose.connect('mongodb://localhost/helloWorld');
}

var userSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true,
	},
	gender: String,
	cardNumber: {
		type: Number,
		unique: true,
		require: true,
		dropDups: true,
	},
	phoneNumber: {
		type: Number,
		unique: true,
		dropDups: true,
	},
	level: String,
	amount: Number,
	note: String,
	avatar: String
});
var userHistorySchema = new mongoose.Schema({
	name: String,
	cardNumber: {
		type: Number,
		require: true,
	},
	type: String,
	detail: Array,
	amount: Number,
	date: Date,
});


const Models = {
  Users:mongoose.model('Users', userSchema),
  UsersHistory:mongoose.model('UsersHistory', userHistorySchema)
}
module.exports = Models;