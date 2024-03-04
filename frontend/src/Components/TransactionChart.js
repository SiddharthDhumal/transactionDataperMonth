import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";
import { getAllProduct } from "../utils/Apiroutes";
import {
	Chart as ChartJS,
	CategoryScale,
	BarElement,
	Tooltip,
	Legend,
	Title,
	LinearScale,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	BarElement,
	Tooltip,
	Legend,
	Title,
	LinearScale
);

const Container = styled.div`
	font-family: Arial, Helvetica, sans-serif;
	border-collapse: collapse;
	width: 80%;
	border: 1px solid #ddd;
	padding: 8px;
	margin: 2rem auto;
	// background-color: #f5dd61;
	border-radius: 9px;
`;

const TransactionChart = ({ selectedMonth }) => {
	const [priceRange, setPriceRange] = useState([]);
	const [range, setRange] = useState([]);
	const [count, setCount] = useState([]);

	useEffect(() => {
		const getData = async () => {
			try {
				const data = await axios.get(
					`${getAllProduct}/getProductspriceRange/${selectedMonth}`
				);

				// console.log(data);
				setPriceRange(data.data.priceRange);
			} catch (error) {
				console.log(error);
			}
		};

		const getRange = () => {
			const getRange = priceRange.map((item) => item.range);
			setRange(getRange);
		};

		const getCount = () => {
			const count = priceRange.map((item) => item.count);
			setCount(count);
		};
		getCount();
		getRange();
		getData();
	}, [selectedMonth, priceRange]);

	return (
		<Container>
			<Bar
				data={{
					labels: [...range],
					datasets: [
						{
							label: "total count/value",

							data: [...count],

							backgroundColor: ["aqua", "green", "#A1EEBD", "yellow"],

							borderColor: ["aqua", "green", "#A1EEBD", "yellow"],
							borderWidth: 0.5,
						},
					],
				}}
				height={400}
				options={{
					maintainAspectRatio: false,
					scales: {
						yAxes: [
							{
								ticks: {
									beginAtZero: true,
								},
							},
						],
					},
					legend: {
						labels: {
							fontSize: 15,
						},
					},
				}}
			/>
		</Container>
	);
};

export default TransactionChart;
