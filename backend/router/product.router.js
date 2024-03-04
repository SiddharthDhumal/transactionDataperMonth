const router = require("express").Router();
const {
	getProductsBySearchAndPagination,
	getAllProducts,
} = require("../controller/product.controller");

const { getProductStats } = require("../controller/productstats.controller");

const {
	getProductspriceRange,
} = require("../controller/productspricerange.controller");

const { getProductPieChart } = require("../controller/productchart.controller");
const {
	getProductCombineData,
} = require("../controller/productcombine.controller");

router.get("/getallproducts/:month", getAllProducts);
router.get(
	"/getallproductsBySearchAndPagination/:month",
	getProductsBySearchAndPagination
);

router.get("/getProductStats/:month", getProductStats);
router.get("/getProductspriceRange/:month", getProductspriceRange);
router.get("/getproductchart/:month", getProductPieChart);
router.get("/getproductcombinedata/:month", getProductCombineData);

module.exports = router;
