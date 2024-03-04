const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const db = async () => {
	await mongoose
		.connect(process.env.DATABASE, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then((con) => console.log("DB connection successful!!"))
		.catch((err) => console.log(err));
};

module.exports = db;
