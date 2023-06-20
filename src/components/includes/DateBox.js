import React, { useState } from "react";
import onClickOutside from "react-onclickoutside";
import styled from "styled-components";

function DateBox({ setDateRange, dateRange }) {
	//date value
	const today = new Date();

	const oneWeekAgo = new Date();
	oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

	const oneMonthAgo = new Date();
	oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

	const formatDate = (date) => {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	};

	const todayFormatted = formatDate(today);
	const oneWeekAgoFormatted = formatDate(oneWeekAgo);
	const oneMonthAgoFormatted = formatDate(oneMonthAgo);

	//outside value
	const [open, setOpen] = useState(false);
	const toggle = () => setOpen(!open);
	DateBox.handleClickOutside = () => setOpen(false);

	const dates = [
		{
			id: 1,
			text: "Today",
			value: todayFormatted,
		},
		{
			id: 2,
			text: "This week",
			value: oneWeekAgoFormatted,
		},
		{
			id: 3,
			text: "This month",
			value: oneMonthAgoFormatted,
		},
	];

	return (
		<div style={{ position: "relative" }}>
			<FilterDiv>
				<FilterLabel
					onClick={() => {
						toggle();
					}}
				>
					Date range:<span> {dateRange.text}</span>{" "}
					<img
						src={
							require("./../../assets/icons/down-arrow.svg")
								.default
						}
						alt="icon"
					/>
				</FilterLabel>
			</FilterDiv>
			{open && (
				<MainDiv>
					<Head>Adjust time span</Head>
					{dates.map((date) => (
						<DateView
							key={date.id}
							onClick={() => {
								setDateRange(date);
								setOpen(false);
							}}
						>
							{date.id === dateRange.id ? (
								<img
									src={
										require("./../../assets/icons/tick.svg")
											.default
									}
									alt="icon"
								/>
							) : (
								<div />
							)}
							<p>{date.text}</p>
						</DateView>
					))}
				</MainDiv>
			)}
		</div>
	);
}

// export default DateBox;

const clickOutsideConfig = {
	handleClickOutside: () => DateBox.handleClickOutside,
};

export default onClickOutside(DateBox, clickOutsideConfig);

const FilterDiv = styled.div`
	width: max-content;
`;
const FilterLabel = styled.div`
	color: #63757d;
	font-size: 14px;
	cursor: pointer;
	span {
		font-weight: 700;
		font-size: 14px;
	}
	img {
		margin-right: 5px;
		height: 9px;
		width: 10px;
	}
`;
const MainDiv = styled.div`
	position: absolute;
	top: 30px;
	background-color: #161b22;
	border: 1px solid #30363d;
	border-radius: 4px;
	width: 180px;
	z-index: 10;
	/* padding: 0 10px; */
`;
const Head = styled.h5`
	color: #fff;
	font-size: 14px;
	margin-bottom: 0;
	text-align: left;
	padding: 5px 10px;
	height: 35px;
	display: flex;
	align-items: center;

	border-bottom: 1px solid #30363d;
`;
const DateView = styled.div`
	display: flex;
	padding: 5px 10px;
	align-items: center;
	display: flex;
	align-items: center;
	border-bottom: 1px solid #30363d;
	:last-child {
		border-bottom: none;
	}
	:hover {
		cursor: pointer;
		background-color: #2f81f7;
	}

	img {
		margin-right: 5px;
		height: 22px;
		width: 24px;
	}

	p {
		color: #fff;
		font-size: 14px;
		margin-bottom: 0;
	}

	div {
		margin-left: 29px;
	}
`;
