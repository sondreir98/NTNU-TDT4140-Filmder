import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import LoginPage from "./pages/loginpage.tsx";
import Profile from "./Profile.tsx";

createRoot(
	document.querySelector(":root > body > #react-root") as HTMLDivElement,
).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route index element={<Home />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignUpPage />} />
				<Route path="/Profile" element={<Profile />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
