import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import styled from "styled-components";

function NotFound404() {
	const darkMode = useSelector((state) => state.auth.darkMode);

	return (
		<Div className={darkMode ? "dark" : "light"}>
			<Container className="text-center p-4 d-flex flex-column justify-content-center align-items-center vh-100 ">
				<img
					src={require(`./../../../assets/images/404.png`)}
					alt="404 Error"
					style={{ height: "60%", width: "40%" }}
				/>
				<h2 className="mt-4 text-secondarys">Page Not Found</h2>
				<p className="text-secondary mb-1">
					Oops! The page you are looking for does not exist.
				</p>
			</Container>
		</Div>
	);
}

export default NotFound404;

const Div = styled.div`
	&.dark {
		background-color: #0d1117;
	}

	&.light {
		background-color: #fff;
	}
`;
