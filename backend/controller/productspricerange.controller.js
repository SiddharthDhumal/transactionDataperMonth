const Product = require("../model/product.model");
const axios = require("axios");

const getProductspriceRange = async (req, res) => {
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

		const priceRange = [
			{ range: "0 - 100", count: 0 },
			{ range: "101 - 200", count: 0 },
			{ range: "201 - 300", count: 0 },
			{ range: "301 - 400", count: 0 },
			{ range: "401 - 500", count: 0 },
			{ range: "501 - 600", count: 0 },
			{ range: "601 - 700", count: 0 },
			{ range: "701 - 800", count: 0 },
			{ range: "801 - 900", count: 0 },
			{ range: "901 - above", count: 0 },
		];

		transactions.forEach((transaction) => {
			const price = transaction.price;
			if (price <= 100) {
				priceRange[0].count++;
			} else if (price <= 200) {
				priceRange[1].count++;
			} else if (price <= 300) {
				priceRange[2].count++;
			} else if (price <= 400) {
				priceRange[3].count++;
			} else if (price <= 500) {
				priceRange[4].count++;
			} else if (price <= 600) {
				priceRange[5].count++;
			} else if (price <= 700) {
				priceRange[6].count++;
			} else if (price <= 800) {
				priceRange[7].count++;
			} else if (price <= 900) {
				priceRange[8].count++;
			} else {
				priceRange[9].count++;
			}
		});

		res.status(200).json({
			status: "Success",
			priceRange,
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
	getProductspriceRange,
};
