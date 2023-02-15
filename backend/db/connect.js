const mongoose = require('mongoose');
require('dotenv').config();
//returns a promise that resolves to a mongoose connection
const connectDb = async () => {
	mongoose.set('strictQuery', true);
	console.log(process.env.MONGO_URI);
	return mongoose.connect(process.env.MONGO_URI);
};
module.exports = connectDb;
