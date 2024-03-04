import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { getAllProduct } from "../utils/Apiroutes";

const Table = styled.table`
	font-family: Arial, Helvetica, sans-serif;
	border-collapse: collapse;
	width: 100%;
	td,
	th {
		border: 1px solid #ddd;
		padding: 8px;
	}
	th {
		padding-top: 12px;
		padding-bottom: 12px;
		text-align: left;
		background-color: #04aa6d;
		color: white;
	}
	tr:nth-child(even) {
		background-color: #f2f2f2;
	}
	tr:hover {
		background-color: #ddd;
	}

	.norecords {
		margin: 1rem auto;
		text-align: center;
		border: 1px solid black;
		width: 100%;
	}
`;

const Button = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 2rem auto;
	width: 80%;
	border: none;
	background-color: none;
	.btn {
		background-color: #04aa6d;
		color: #ffff;
		padding: 0.8rem 1rem;
		border: none;
		border-radius: 9px;
		cursor: pointer;
		font-weight: 600;
	}
	.btn:disabled {
		background-color: #cccccc;
		color: #666666;
	}
`;

const TransactionTable = ({
	selectedMonth,
	searchTransaction,
	setSearchTransaction,
}) => {
	const [transactionData, setTransactionData] = useState([]);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(5);
	useEffect(() => {
		const getData = async () => {
			try {
				const data = await axios.get(
					`${getAllProduct}/getallproducts/${selectedMonth}`,
					{
						params: {
							search: searchTransaction,
							page: page,
							// limit: limit,
						},
					}
				);
				console.log(data);
				setTransactionData(data.data.paginatedTransactions);
			} catch (error) {
				console.log(error);
			}
		};

		getData();
	}, [selectedMonth, searchTransaction, page, limit]);

	// console.log(transactionData);

	const handlePrevPage = (e) => {
		e.preventDefault();
		setPage((page) => page - 1);
		setSearchTransaction("");
	};

	const handleNextPage = (e) => {
		e.preventDefault();
		setPage((page) => page + 1);
		setSearchTransaction("");
	};

	console.log(transactionData);

	return (
		<div className="transactionTable">
			<Table>
				<tr>
					<th>Id</th>
					<th>Title</th>
					<th>Price</th>
					<th>Description</th>
					<th>Category</th>
					<th>Date of Sale</th>
					<th>Sold Item</th>
				</tr>
				{transactionData.length > 0 ? (
					<>
						{transactionData.map((transaction, index) => (
							<tr key={index}>
								<td>{transaction.id}</td>
								<td>{transaction.title}</td>
								<td>{transaction.price}</td>
								<td>{transaction.description}</td>
								<td>{transaction.category}</td>
								<td>{new Date(transaction.dateOfSale).toLocaleString()}</td>
								<td>{transaction.sold.toString() === true ? "Yes" : "No"}</td>
							</tr>
						))}
					</>
				) : (
					<div className="norecords">
						<h1>No Records Found</h1>
					</div>
				)}
			</Table>
			<Button>
				<button onClick={handlePrevPage} disabled={page === 1} className="btn">
					Previous
				</button>
				<button onClick={handleNextPage} className="btn">
					Next
				</button>
			</Button>
		</div>
	);
};

export default TransactionTable;
