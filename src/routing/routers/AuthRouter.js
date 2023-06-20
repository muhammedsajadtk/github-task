import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../../components/screens/login/Login";

export default function AuthRouter() {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
		</Routes>
	);
}
