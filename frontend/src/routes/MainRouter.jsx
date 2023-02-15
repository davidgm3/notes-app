import { Routes, BrowserRouter, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { NotePage } from "../pages/NotePage";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
export const MainRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/notes/:id" element={<NotePage />} />
				<Route path="*" element={<h1>404</h1>} />
			</Routes>
		</BrowserRouter>
	);
};
