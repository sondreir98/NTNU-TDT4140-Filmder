import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./Home.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar.tsx";

createRoot(
	document.querySelector(":root > body > #react-root") as HTMLDivElement,
).render(
	<StrictMode>
		<BrowserRouter>
			<Navbar/>
			<Routes>
				<Route index element={<Home/>} />
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
