import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import Season23 from "./Season23";
import Season24 from "./Season24";

ReactDOM.render(
	<Router>
		<Routes>
			<Route path="/" element={<React.StrictMode><App /></React.StrictMode>}/>
			<Route path="/season23" element={<React.StrictMode><Season23 /></React.StrictMode>}/>
			<Route path="/season24" element={<React.StrictMode><Season24 /></React.StrictMode>}/>
		</Routes>
	</Router>,
	// <React.StrictMode>
	// 	<App />
	// </React.StrictMode>,
	document.getElementById("root")
);
