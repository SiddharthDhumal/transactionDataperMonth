import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getAllProduct } from "../utils/Apiroutes";

const Container = styled.div`
	font-family: Arial, Helvetica, sans-serif;
	border-collapse: collapse;
	width: 50%;
	border: 1px solid #ddd;
	padding: 8px;
	margin: 2rem auto;
	background-color: #f5dd61;
	border-radius: 9px;
	h1 {
		margin-bottom: 1rem;
	}
	.statsDiv {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 30px;
	}
`;

const TransactionStats = ({ selectedMonth }) => {
	const [showStats, setShowStats] = useState("");

	useEffect(() => {
		const getData = async () => {
			try {
				const data = await axios.get(
					`${getAllProduct}//getProductStats/${selectedMonth}`
				);

				setShowStats(data.data.stats);
			} catch (error) {
				console.log(error);
			}
		};

		getData();
	}, [selectedMonth]);

	const monthsArr = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	return (
		<Container>
			<h1>Statistics for {monthsArr[selectedMonth - 1]} Month:</h1>
			<ul>
				<li className="statsDiv">
					<h4>Total Sale:</h4>
					<p>{showStats.totalAmount}</p>
				</li>
				<li className="statsDiv">
					<h4>Total Sold Item:</h4>
					<p>{showStats.totalSoldItems}</p>
				</li>
				<li className="statsDiv">
					<h4>Total not Sold Item:</h4>
					<p>{showStats.totalNotSoldItems}</p>
				</li>
			</ul>
		</Container>
	);
};

export default TransactionStats;
