const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./db");
const productRouter = require("./router/product.router");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/product", productRouter);

db();

app.listen(process.env.PORT, () => {
	console.log(`App is listening at port ${process.env.PORT}`);
});
