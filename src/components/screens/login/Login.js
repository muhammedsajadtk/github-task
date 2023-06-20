// Login.js
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import BgImage from "./../../../assets/images/bg.jpg";
// import { useHistory } from "react-router-dom";

import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { setAccessToken } from "../../../redux/AuthSlice";
import { useDispatch } from "react-redux";

const Login = () => {
	const [isLoading, setLoading] = useState(true);
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const clientId = "180657ad4b86eb26ba7f";
	const redirectUri = "http://localhost:3000/repos";
	const clientSecret = "573a13ec75338622b1c1f2ebeaca956448308f60";

	const [isError, setError] = useState(false);

	const location = useLocation();

	const handleLogin = () => {
		const loginUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}`;

		window.location.href = loginUrl;
	};

	const urlParams = new URLSearchParams(location.search);
	const code = urlParams.get("code");

	const getAccess = () => {
		setError(false);
		var formdata = new FormData();
		formdata.append("code", code);
		formdata.append("client_id", clientId);
		formdata.append("client_secret", clientSecret);

		axios
			.post(
				`https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token`,
				// `https://github.com/login/oauth/access_token`,

				formdata,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then(function (response) {
				const { data } = response;
				setLoading(false);
				const url = new URL(`https://example.com/path?${data}`);
				const searchParams = new URLSearchParams(url.search);
				const accessToken = searchParams.get("access_token");

				if (accessToken) {
					dispatch(setAccessToken(accessToken));
				}
			})
			.catch(function (error) {
				// alert(error.message);
				console.log(error.response.status);
				setError(true);
			});
	};

	useEffect(() => {
		if (code !== "null") {
			getAccess();
		}
	}, [code]);

	return (
		<LoginPage>
			<LoginForm
			// onSubmit={handleSubmit}
			>
				<Heading
					onClick={() => {
						navigate("/repos");
					}}
				>
					Login
				</Heading>
				{/* <InputField
					type="text"
					placeholder="Username"
					ref={usernameRef}
					onChange={(e) => {
						setUsername(e.target.value);
					}}
					value={username}
					onKeyPress={(e) => {
						handleUsernameKeyPress(e);
					}}
				/>
				<InputField
					type="password"
					placeholder="Password"
					ref={passwordRef}
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					onKeyPress={(e) => {
						handlePasswordKeyPress(e);
					}}
				/> */}
				{/* <SubmitButton onClick={handleSubmit}>Login</SubmitButton> */}
				<SubmitButton onClick={handleLogin}>
					Login with GitHub
				</SubmitButton>
			</LoginForm>

			{isError && (
				<ErrorDiv>
					<ExternalLinkDiv>
						<ExternalLink
							to="https://cors-anywhere.herokuapp.com/corsdemo"
							target="_blank"
						>
							Demo Server
						</ExternalLink>
					</ExternalLinkDiv>
					<Ul>
						<Li>
							After clicking the "Demo Server" button, you will be
							redirected to a new tab. In that tab, you will see a
							button labeled "Request Temporary Access for the
							Demo Server." Please click on this button to
							proceed.
						</Li>
						<Li>
							To continue using the demo server, you may need to
							re-login. To do this, please click on the "Login"
							button provided on the page.
						</Li>
						<Li>
							However, please note that this access is temporary
							and will expire after a certain period of time.
						</Li>
					</Ul>
				</ErrorDiv>
			)}
		</LoginPage>
	);
};

export default Login;

const LoginPage = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	background-color: #f2f2f2;
	/* background: #f1f1f1 url(${BgImage}) center/cover; */
`;

const LoginForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 300px;
	padding: 20px;
	border-radius: 4px;
	background-color: #fff;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

	@media screen and (max-width: 480px) {
		width: 80%;
	}
`;
const Heading = styled.h2`
	color: #000;
	font-size: 28px;
	margin-bottom: 15px;
	font-weight: 500;
`;
const InputField = styled.input`
	width: 100%;
	padding: 10px;
	margin-bottom: 10px;
	border: 1px solid #ccc;
	border-radius: 4px;
	/* box-sizing: border-box; */

	@media screen and (max-width: 480px) {
		width: 100%;
	}
`;

const SubmitButton = styled.div`
	width: 100%;
	padding: 10px;
	background-color: #006b95;
	color: #fff;
	border: none;
	border-radius: 4px;
	/* box-sizing: border-box; */
	cursor: pointer;
	text-align: center;

	&:hover {
		background-color: #005276;
	}

	@media screen and (max-width: 480px) {
		width: 100%;
	}
`;
const ErrorDiv = styled.div`
	width: 60%;
	margin-top: 40px;
`;
const Ul = styled.ul`
	list-style: disc;
`;
const Li = styled.li`
	font-size: 14px;
	color: red;
`;
const ExternalLinkDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const ExternalLink = styled(Link)`
	text-decoration: none;
	height: 35px;
	border: 1px solid #c1c1c1;
	border-radius: 4px;
	width: max-content;
	padding: 0 8px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #f8f8f8;

	&:hover {
		background-color: #c3c3c3; /* Change the background color on hover */
	}
`;
