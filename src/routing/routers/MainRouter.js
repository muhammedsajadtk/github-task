import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthRoute from "../routes/AuthRoute";
import PrivateRoute from "../routes/PrivateRoute";
import AuthRouter from "./AuthRouter";
import PrivateRouter from "./PrivateRouter";
import NotFound404 from "../../components/screens/error-pages/NotFound404";

export default function MainRouter() {
	return (
		<>
			<Routes>
				<Route
					path="login//*"
					element={
						<AuthRoute>
							<AuthRouter />
						</AuthRoute>
					}
				/>
				<Route
					path="/*"
					element={
						<PrivateRoute>
							<PrivateRouter />
						</PrivateRoute>
					}
				/>
				<Route exact path="*" element={<NotFound404 />} />
			</Routes>
		</>
	);
}
