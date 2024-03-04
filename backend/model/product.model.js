const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "A product must have title"],
		trim: true,
	},
	price: {
		type: Number,
		required: [true, "A product must have price"],
	},
	description: {
		type: String,
		trim: true,
	},
	category: {
		type: String,
		required: [true, "A product must have category"],
		trim: true,
	},
	image: {
		type: String,
	},
	sold: {
		type: Boolean,
		default: false,
	},
	dateOfSale: {
		type: Date,
		required: [true, "A product should be date"],
	},
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
