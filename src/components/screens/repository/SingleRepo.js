import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./TrendingRepos.css";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import Loader from "../../includes/Loader";

function SingleRepo() {
	const accessToken = useSelector((state) => state.auth.accessToken);
	const darkMode = useSelector((state) => state.auth.darkMode);

	//loading
	const [isLoading, setIsLoading] = useState(true);

	const { user, repoName } = useParams();
	const [repo, setRepo] = useState({});

	const getSingleRepo = () => {
		setIsLoading(true);
		axios
			.get(`https://api.github.com/repos/${user}/${repoName}`, {
				params: {},
				headers: {
					Authorization: "Bearer " + accessToken,
				},
			})
			.then(function (response) {
				const { data } = response;
				setRepo(data);
				setIsLoading(false);
			})
			.catch(function (error) {
				setIsLoading(false);
				alert(error.message);
			});
	};

	useEffect(() => {
		getSingleRepo();
	}, []);

	return (
		<div>
			<HeaderDiv
				className={
					darkMode
						? "d-flex align-items-center justify-content-between header-div"
						: "d-flex align-items-center justify-content-between"
				}
			>
				<div className="wrapper">
					<HeaderTop>
						<HeaderTopLeft>
							<div className="flex-grow-1 d-flex flex-items-center">
								<img
									className="svg-icon "
									src={
										require("./../../../assets/icons/git-repo-2.svg")
											.default
									}
									alt="icon"
								/>
								<Heading className="text-break">
									<span>{user}/</span>
									{repoName}
								</Heading>
							</div>
						</HeaderTopLeft>
						<HeaderTopRight></HeaderTopRight>
					</HeaderTop>
					<HeaderBottom>
						<TabContainer className="flex-grow-1 d-flex flex-items-center flex-wrap">
							<TabDiv>
								<img
									className="svg-icon "
									src={
										require("./../../../assets/icons/code.svg")
											.default
									}
									alt="icon"
								/>
								<TabName className={darkMode ? "dark" : ""}>
									Code
								</TabName>
							</TabDiv>
							<TabDiv>
								<img
									className="svg-icon "
									src={
										require("./../../../assets/icons/issue.svg")
											.default
									}
									alt="icon"
								/>
								<TabName className={darkMode ? "dark" : ""}>
									Issue
								</TabName>
							</TabDiv>
							<TabDiv>
								<img
									className="svg-icon "
									src={
										require("./../../../assets/icons/pull-request.svg")
											.default
									}
									alt="icon"
								/>
								<TabName className={darkMode ? "dark" : ""}>
									Pull request
								</TabName>
							</TabDiv>
							<TabDiv>
								<img
									className="svg-icon "
									src={
										require("./../../../assets/icons/discussion.svg")
											.default
									}
									alt="icon"
								/>
								<TabName className={darkMode ? "dark" : ""}>
									Discussions
								</TabName>
							</TabDiv>
							<TabDiv>
								<img
									className="svg-icon "
									src={
										require("./../../../assets/icons/action.svg")
											.default
									}
									alt="icon"
								/>
								<TabName className={darkMode ? "dark" : ""}>
									Action
								</TabName>
							</TabDiv>
							<TabDiv>
								<img
									className="svg-icon "
									src={
										require("./../../../assets/icons/warning.svg")
											.default
									}
									alt="icon"
								/>
								<TabName className={darkMode ? "dark" : ""}>
									Security
								</TabName>
							</TabDiv>
							<TabDiv>
								<img
									className="svg-icon "
									src={
										require("./../../../assets/icons/graph.svg")
											.default
									}
									alt="icon"
								/>
								<TabName className={darkMode ? "dark" : ""}>
									Insight
								</TabName>
							</TabDiv>
						</TabContainer>
					</HeaderBottom>
				</div>
			</HeaderDiv>

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
					Object.keys(repo).length > 0 && (
						<BodyDiv className=" d-flex flex-items-center flex-wrap ">
							<BodyLeft className="w-75">
								<Div className={darkMode ? "dark" : ""}>
									<img
										src={require(`./../../../assets/images/no-data.png`)}
										alt="404 Error"
										style={{
											height: "40%",
											width: "25%",
										}}
									/>
									<h3 className="mt-3 text-secondary">
										Data Not Found
									</h3>
									<p className="text-secondary mb-1">
										Oops! somthing went wrong
									</p>
								</Div>
							</BodyLeft>
							<BodyRight className="w-25">
								<AboutHead className={darkMode ? "dark" : ""}>
									About
								</AboutHead>
								<AboutDescription
									className={darkMode ? "dark" : ""}
								>
									{repo.description}
								</AboutDescription>
								<TopicDiv className="flex-grow-1 d-flex flex-items-center flex-wrap">
									{repo.topics.map((item, i) => (
										<Topic key={i}>{item}</Topic>
									))}
								</TopicDiv>
							</BodyRight>
						</BodyDiv>
					)
				)}
			</BodyContainer>
		</div>
	);
}

export default SingleRepo;

const HeaderDiv = styled.div`
	padding: 10px 0;
`;
const HeaderTop = styled.div``;
const HeaderTopLeft = styled.div``;

const Heading = styled.h4`
	color: #2f81f7;
	font-size: 17px;
	font-weight: 500;
	text-decoration: none;
	margin-left: 10px;
	span {
		font-weight: 400;
	}
`;
const HeaderTopRight = styled.div``;
const HeaderBottom = styled.div``;
const TabContainer = styled.div``;
const TabDiv = styled.div`
	margin-right: 15px;
	img {
		margin-bottom: 4px;
		margin-right: 8px;
	}
`;
const TabName = styled.span`
	color: #000;
	font-size: 15px;
	&.dark {
		color: #fff;
	}
`;

const BodyContainer = styled.div`
	min-height: calc(100vh - 130px);
`;
const BodyDiv = styled.div`
	margin: 0 60px;
	padding: 40px 0;
	@media screen and (max-width: 768px) {
		flex-direction: column;
	}
`;
const BodyLeft = styled.div`
	@media screen and (max-width: 768px) {
		width: 100% !important;
	}
`;
const BodyRight = styled.div`
	@media screen and (max-width: 768px) {
		width: 100% !important;
	}
`;

const AboutHead = styled.h4`
	color: #000;
	&.dark {
		color: #fff;
		font-size: 17px;
	}
`;
const AboutDescription = styled.div`
	color: #000;
	&.dark {
		color: #fff;
		font-size: 16px;
	}
`;
const TopicDiv = styled.div`
	margin-top: 15px;
`;
const Topic = styled.div`
	background-color: rgba(31, 111, 235, 0.1);
	padding: 6px 15px;
	border-radius: 16px;
	color: #1f6feb;
	margin-right: 10px;
	margin-bottom: 8px;
	&:hover {
		background-color: #1f6feb;
		color: #fff;
	}
`;

const Div = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	&.dark {
		background-color: #0d1117;
	}

	&.light {
		background-color: #fff;
	}
	h3 {
		text-align: center;
		font-size: 20px;
		font-weight: 600;
	}
	p {
		text-align: center;
		font-size: 15px;
	}
`;
