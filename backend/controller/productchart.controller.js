const Product = require("../model/product.model");
const axios = require("axios");

const getProductPieChart = async (req, res) => {
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

		const categories = {};
		transactions.forEach((transaction) => {
			const category = transaction.category;
			if (!categories[category]) {
				categories[category] = 0;
			}
			categories[category]++;
		});

		const categoriesArray = Object.entries(categories).map(
			([category, count]) => ({ category, count })
		);

		console.log(categoriesArray);

		res.status(200).json({
			status: "success",
			chart: {
				categoriesArray,
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
	getProductPieChart,
};
