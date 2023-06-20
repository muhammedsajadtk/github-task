import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import TrendingRepos from "../../components/screens/repository/TrendingRepos";
import NotFound404 from "../../components/screens/error-pages/NotFound404";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../redux/AuthSlice";
import "./../../assets/css/style.css";

//bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import SingleRepo from "../../components/screens/repository/SingleRepo";

export default function PrivateRouter() {
	const darkMode = useSelector((state) => state.auth.darkMode);
	const dispatch = useDispatch();

	const handleToggle = () => {
		dispatch(toggleDarkMode(!darkMode));
	};
	return (
		<>
			<div className={darkMode ? "header-dark" : "header-light"}>
				<div className="wrapper d-flex align-items-center justify-content-end">
					<ToggleButtonGroup type="checkbox" className="">
						<ToggleButton
							id="toggle-button"
							type="checkbox"
							variant={darkMode ? "primary" : "secondary"}
							checked={darkMode}
							onChange={handleToggle}
						>
							{darkMode ? "Light" : "Dark"}
						</ToggleButton>
					</ToggleButtonGroup>
				</div>
			</div>
			<Routes>
				<Route
					exact
					path="/"
					element={<Navigate to="/repos" replace />}
				/>
				<Route path="/repos" element={<TrendingRepos />} />
				<Route path="/repos/:user/:repoName" element={<SingleRepo />} />

				<Route path="*" element={<NotFound404 />} />
			</Routes>
		</>
	);
}
