const Product = require("../model/product.model");
const axios = require("axios");

const getProductStats = async (req, res) => {
	try {
		// let transactions = await Product.find();
		const response = await axios.get(
			"https://s3.amazonaws.com/roxiler.com/product_transaction.json"
		);
		let transactions = response.data;
		const month = parseInt(req.params.month);

		if (month) {
			transactions = transactions.filter((transaction) => {
				const saleDate = new Date(transaction.dateOfSale);
				const saleMonth = saleDate.getMonth() + 1;

				return saleMonth === month;
			});
		}

		const totalAmount = transactions.reduce(
			(total, transaction) => total + transaction.price,
			0
		);

		const totalSoldItems = transactions.filter(
			(transaction) => transaction.sold
		).length;

		const totalNotSoldItems = transactions.filter(
			(transation) => !transation.sold
		).length;

		res.status(200).json({
			status: "Success",
			stats: {
				totalAmount,
				totalSoldItems,
				totalNotSoldItems,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			status: "failed",
			message: error,
		});
	}
};

module.exports = {
	getProductStats,
};
