const Product = require("../model/product.model");
const axios = require("axios");

const getProductCombineData = async (req, res) => {
	try {
		const response = await axios.get(
			"https://s3.amazonaws.com/roxiler.com/product_transaction.json"
		);
		let transactions = response.data;
		const month = parseInt(req.params.month);

		const getAllProducts = async (month) => {
			// let transactions = await Product.find();
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

			const dataBySearch = await Product.find({
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
			})
				.skip((page - 1) * limit)
				.limit(limit);

			const dataByPagination = await Product.find()
				.skip((page - 1) * limit)
				.limit(limit);

			console.log(dataByPagination);

			const data = dataBySearch.length > 0 ? dataBySearch : dataByPagination;

			return data;
		};

		const getProductStats = async (month) => {
			try {
				// let transactions = await Product.find();

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

				return {
					stats: {
						totalAmount,
						totalSoldItems,
						totalNotSoldItems,
					},
				};
			} catch (error) {
				console.log(error);
				res.status(400).json({
					status: "failed",
					message: error,
				});
			}
		};

		const getProductspriceRange = async (month) => {
			try {
				// let transactions = await Product.find();

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

				return priceRange;
			} catch (error) {
				console.log(error);
				res.status(400).json({
					status: "failed",
					message: error,
				});
			}
		};

		const getProductPieChart = async (month) => {
			try {
				// let transactions = await Product.find();

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

				return categoriesArray;
			} catch (error) {
				console.log(error);
				res.status(400).json({
					status: "failed",
					message: error,
				});
			}
		};

		const [transaction, stats, priceRange, categoriesArray] = await Promise.all(
			[
				getAllProducts(month),
				getProductStats(month),
				getProductspriceRange(month),
				getProductPieChart(month),
			]
		);

		const combinedData = {
			transactions,
			stats,
			priceRange,
			categoriesArray,
		};

		res.status(200).json({
			status: "success",
			chart: {
				combinedData,
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

module.exports = { getProductCombineData };
