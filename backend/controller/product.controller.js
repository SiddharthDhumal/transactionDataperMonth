const axios = require("axios");
const Product = require("../model/product.model");

const getAllProducts = async (req, res) => {
	try {
		const response = await axios.get(
			"https://s3.amazonaws.com/roxiler.com/product_transaction.json"
		);
		let transactions = response.data;

		// Filter transactions by month if month parameter is provided
		const month = parseInt(req.params.month);

		if (month) {
			transactions = transactions.filter((transaction) => {
				const saleDate = new Date(transaction.dateOfSale);
				const saleMonth = saleDate.getMonth() + 1;

				return saleMonth === month;
			});
		}

		if (req.query.search) {
			const searchQuery = req.query.search.toLowerCase().trim();
			console.log(searchQuery);
			transactions = transactions.filter((transaction) => {
				transaction.title.toLowerCase().includes(searchQuery) ||
					transaction.description.toLowerCase().includes(searchQuery) ||
					transaction.price.toString().includes(searchQuery);
			});
			console.log(transactions);
		}

		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const startIndex = (page - 1) * limit;
		const endIndex = startIndex + limit;
		const paginatedTransactions = transactions.slice(startIndex, endIndex);
		res.status(200).json({
			status: "success",
			paginatedTransactions,
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			status: "failed",
			message: error,
		});
	}
};

const getProductsBySearchAndPagination = async (req, res) => {
	try {
		const response = await axios.get(
			"https://s3.amazonaws.com/roxiler.com/product_transaction.json"
		);
		let transactions = response.data;

		// Filter transactions by month if month parameter is provided
		const month = parseInt(req.params.month);

		if (month) {
			transactions = transactions.filter((transaction) => {
				const saleDate = new Date(transaction.dateOfSale);
				const saleMonth = saleDate.getMonth() + 1;

				return saleMonth === month;
			});
		}

		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const priceRegex = /^\d+(\.\d+)?$/;

		const date = new Date(`1965-${month}-01T00:00:00Z`);

		const dataBySearch = await Product.find({
			$and: [
				{
					$or: [
						{ title: { $regex: req.query.title || "none", $options: "i" } },
						{
							description: {
								$regex: req.query.description || "none",
								$options: "i",
							},
						},
						{
							price: priceRegex.test(req.query.price)
								? parseFloat(req.query.price)
								: 0,
						},
					],
				},
				{
					$expr: {
						$gte: [{ $month: "$dateOfSale" }, date.getUTCMonth() + 1],
					},
				},
			],
		})
			.skip((page - 1) * limit)
			.limit(limit);

		console.log(dataBySearch);

		const dataByPagination = await Product.find()
			.skip((page - 1) * limit)
			.limit(limit);

		// console.log(dataByPagination);
		let paginatedTransactions;

		// if (month) {
		// 	paginatedTransactions =
		// 		transactions.length > 0 ? transactions : dataByPagination;
		// } else {
		paginatedTransactions =
			dataBySearch.length > 0 ? dataBySearch : dataByPagination;
		// }

		res.status(200).json({
			status: "success",
			paginatedTransactions,
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
	getAllProducts,
	getProductsBySearchAndPagination,
};
