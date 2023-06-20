import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./assets/css/style.css";
import MainRouter from "./routing/routers/MainRouter";

const App = () => {
	return (
		<Router>
			<MainRouter />
		</Router>
	);
};

export default App;
