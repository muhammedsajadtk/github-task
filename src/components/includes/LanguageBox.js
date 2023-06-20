import axios from "axios";
import React, { useEffect, useState } from "react";
import onClickOutside from "react-onclickoutside";
import { useSelector } from "react-redux";
import styled from "styled-components";

function LanguageBox({ language, setLanguage }) {
	//outside value
	const [open, setOpen] = useState(false);
	const toggle = () => setOpen(!open);
	LanguageBox.handleClickOutside = () => setOpen(false);

	const languageArray = [
		{
			id: 11,
			text: "Any",
			value: "",
		},
		{
			id: 1,
			text: "HTML",
			value: "html",
		},
		{
			id: 2,
			text: "Python",
			value: "python",
		},
		{
			id: 3,
			text: "Javascript",
			value: "javascript",
		},
		{
			id: 4,
			text: "Typescript",
			value: "typescript",
		},
		{
			id: 5,
			text: "Django",
			value: "django",
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
					Language:<span> {language.text}</span>
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
					{languageArray.map((date) => (
						<DateView
							key={date.id}
							onClick={() => {
								setLanguage(date);
								setOpen(false);
							}}
						>
							{date.id === language.id ? (
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

const clickOutsideConfig = {
	handleClickOutside: () => LanguageBox.handleClickOutside,
};

export default onClickOutside(LanguageBox, clickOutsideConfig);

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
	z-index: 10;
	top: 30px;
	background-color: #161b22;
	border: 1px solid #30363d;
	border-radius: 4px;
	width: 180px;
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
