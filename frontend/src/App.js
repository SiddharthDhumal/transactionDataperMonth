import { useState } from "react";
import "./App.css";
import styled from "styled-components";
import TransactionTable from "./Components/TransactionTable";
import TransactionStats from "./Components/TransactionStats";
import TransactionChart from "./Components/TransactionChart";

const Container = styled.div`
	width: 80%;
	margin: 2rem auto;
	.selectedTransaction,
	.selectedMonth {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		label {
			margin-bottom: 0.8rem;
		}
	}

	.selectedTransaction {
		input {
			padding: 0.2rem 0.5rem;
			width: 15rem;
		}
	}
	.select-tranactions {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
	}
`;

function App() {
	const [selectedMonth, setSelectedMonth] = useState(3);
	const [searchTransaction, setSearchTransaction] = useState("");

	const handleMonthChange = (e) => {
		setSelectedMonth(parseInt(e.target.value));
	};

	const handleSearchTransaction = (e) => {
		setSearchTransaction(e.target.value);
	};

	return (
		<Container>
			<div className="select-tranactions">
				<div className="selectedTransaction">
					<label>Search Transaction: </label>
					<input
						value={searchTransaction}
						onChange={handleSearchTransaction}
						placeholder="Select Title, description or price"
					/>
				</div>
				<div className="selectedMonth">
					<label htmlFor="month">Select Month: </label>
					<select id="month" value={selectedMonth} onChange={handleMonthChange}>
						<option value="1">January</option>
						<option value="2">February</option>
						<option value="3">March</option>
						<option value="4">April</option>
						<option value="5">May</option>
						<option value="6">June</option>
						<option value="7">July</option>
						<option value="8">August</option>
						<option value="9">September</option>
						<option value="10">October</option>
						<option value="11">November</option>
						<option value="12">December</option>
					</select>
				</div>
			</div>
			<TransactionTable
				selectedMonth={selectedMonth}
				searchTransaction={searchTransaction}
				setSearchTransaction={setSearchTransaction}
			/>
			<TransactionStats selectedMonth={selectedMonth} />
			<TransactionChart selectedMonth={selectedMonth} />
		</Container>
	);
}

export default App;
