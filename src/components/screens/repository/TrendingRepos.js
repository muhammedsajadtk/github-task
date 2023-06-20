import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken, toggleDarkMode } from "./../../../redux/AuthSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TrendingRepos.css";
import styled from "styled-components";
import { Link } from "react-router-dom";
import DateBox from "../../includes/DateBox";
import LanguageBox from "../../includes/LanguageBox";
import Loader from "../../includes/Loader";

function TrendingRepos() {
	const accessToken = useSelector((state) => state.auth.accessToken);
	const darkMode = useSelector((state) => state.auth.darkMode);

	const [repos, setRepos] = useState({});
	const [language, setLanguage] = useState({
		id: 11,
		text: "Any",
		value: "",
	});

	//loading
	const [isLoading, setIsLoading] = useState(true);

	//date section
	const today = new Date();

	const formatDate = (date) => {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	};

	const todayFormatted = formatDate(today);

	const [dateRange, setDateRange] = useState({
		id: 1,
		text: "Today",
		value: todayFormatted,
	});

	const getTrending = () => {
		setIsLoading(true);
		axios
			.get("https://api.github.com/search/repositories", {
				params: {
					q: `>created:${dateRange?.value} language:${language?.value}`,
					order: "desc",
					sort: "stars",
				},
				headers: {
					Authorization: "Bearer " + accessToken,
				},
			})
			.then(function (response) {
				const { data } = response;
				setRepos(data);
				setIsLoading(false);
			})
			.catch(function (error) {
				setIsLoading(false);
				alert(error.message);
			});
	};

	useEffect(() => {
		if (dateRange) {
			getTrending();
		}
	}, [language, dateRange]);

	return (
		<div>
			<div
				className={` ${
					darkMode
						? " d-flex align-items-center justify-content-between header-div"
						: "d-flex align-items-center justify-content-between"
				}`}
			>
				<div className="wrapper pt-4 pb-4">
					<div className="container-lg p-responsive text-center py-6 ">
						<h1
							className={` ${
								darkMode ? "h2 text-white" : "h2 text-black"
							}`}
						>
							Trending
						</h1>
						<p className="text-secondary col-md-6 mx-auto fs-6 text">
							See what the GitHub community is most excited about
							today.
						</p>
					</div>
				</div>
			</div>

			<BodyContainer
				className={`d-flex align-items-center justify-content-between ${
					darkMode ? "body-div-dark" : "body-div-light"
				} `}
			>
				{isLoading ? (
					<div className="wrapper pt-4 pb-4">
						<Loader />
					</div>
				) : (
					<>
						{repos?.items?.length > 0 && (
							<div className="wrapper pt-4 pb-4">
								<BodyDiv className="col-md-8 mx-auto p-3">
									<HeaderDiv
										className={`d-md-flex flex-items-center flex-justify-between p-3 rounded-top ${
											darkMode ? "" : "light"
										}`}
									>
										<HeaderLeft className="container-lg p-responsive text-center py-6 p-0">
											<RepoDiv>Repository</RepoDiv>
										</HeaderLeft>
										<HeaderRight className="d-flex flex-wrap ">
											<div
												style={{
													marginRight: "25px",
												}}
												className="flex-grow-1 d-flex flex-items-center "
											>
												<DateBox
													setDateRange={setDateRange}
													dateRange={dateRange}
												/>
											</div>
											<div className="flex-grow-1 d-flex flex-items-center">
												<LanguageBox
													language={language}
													setLanguage={setLanguage}
												/>
											</div>
										</HeaderRight>
									</HeaderDiv>
									<div>
										{repos?.items?.map((repo) => (
											<CardDiv
												key={repo.id}
												className={`Box-row d-flex p-3 d-flex flex-wrap ${
													darkMode ? "" : "light"
												}`}
											>
												<CardLeft className="flex-grow-1">
													<Heading
														className="text-break"
														to={`/repos/${repo.owner.login}/${repo.name}/`}
													>
														<span>
															{repo.owner.login}/
														</span>
														{repo.name}
													</Heading>
													<p className="text-secondary mb-1 text-break  ">
														{repo.description}
													</p>
													<BottomDiv className="d-flex d-flex flex-wrap w-50 ">
														<div className="flex-grow-1 d-flex align-items-center">
															<p className="text-secondary  text-break  mb-0">
																{repo.language
																	? repo.language
																	: "--"}
															</p>
														</div>

														<div className="flex-grow-1 d-flex flex-items-center">
															<img
																className="svg-icon "
																src={
																	require("./../../../assets/icons/star.svg")
																		.default
																}
																alt="icon"
															/>
															<p className="text-secondary  text-break flex-grow-1 mb-0">
																{
																	repo.stargazers_count
																}
															</p>
														</div>

														<div className="flex-grow-1 d-flex flex-items-center">
															<img
																className="svg-icon "
																src={
																	require("./../../../assets/icons/fork.svg")
																		.default
																}
																alt="icon"
															/>
															<p className="text-secondary  text-break flex-grow-1 mb-0">
																{
																	repo.forks_count
																}
															</p>
														</div>
													</BottomDiv>
												</CardLeft>
												<CardRight className="flex-grow-1">
													<StarCount className="text-secondary mb-0">
														{repo.stargazers_count}{" "}
														starts
													</StarCount>
												</CardRight>
											</CardDiv>
										))}
									</div>
								</BodyDiv>
							</div>
						)}
					</>
				)}
			</BodyContainer>
		</div>
	);
}

export default TrendingRepos;

const BodyContainer = styled.div`
	min-height: calc(100vh - 140px);
`;
const BodyDiv = styled.div``;
const HeaderDiv = styled.div`
	background-color: #161b22;
	border: 1px solid #30363d;
	border-bottom: none;
	&.light {
		background-color: #f3f3f3;
	}
`;
const HeaderLeft = styled.div`
	width: 50%;
	@media (max-width: 768px) {
		margin-bottom: 5px;
		width: auto;
	}
`;
const RepoDiv = styled.div`
	background-color: #1f6feb;
	color: #fff;
	width: max-content;
	padding: 0 10px;
	/* height: 32px; */
	display: flex;
	align-items: center;
	border-radius: 4px;
	/* font-size: 15px; */
	font-weight: 600;
`;
const HeaderRight = styled.div`
	width: 50%;
	@media (max-width: 768px) {
		width: auto;
	}
`;
const FilterDiv = styled.div`
	width: max-content;
`;
const FilterLabel = styled.div`
	color: #63757d;
	font-size: 14px;
`;
const FilterValue = styled.div``;

const CardDiv = styled.div`
	background-color: #0d1117;
	border: 1px solid #30363d;
	border-bottom: none;
	:last-child {
		border-bottom: 1px solid #30363d;
	}
	&.light {
		background-color: #fff;
	}
`;
const CardLeft = styled.div`
	width: 65%;
	p {
		font-size: 14px;
	}
`;
const Heading = styled(Link)`
	color: #2f81f7;
	font-size: 20px;
	font-weight: 600;
	text-decoration: none;
	span {
		font-weight: 400;
	}
	&:hover {
		text-decoration: underline;
		cursor: pointer;
	}
`;
const BottomDiv = styled.div``;
const CardRight = styled.div`
	width: 25%;
	height: inherit;
	display: flex;
	align-items: end;
	justify-content: flex-end;
`;
const StarCount = styled.p`
	display: flex;
	align-items: end;
	justify-content: flex-end;
	font-size: 14px;
`;
