import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home.tsx";
import Navbar from "./Navbar.tsx";
import Profile from "./Profile.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import LoginPage from "./pages/loginpage.tsx";

createRoot(
	document.querySelector(":root > body > #react-root") as HTMLDivElement,
).render(
	<StrictMode>
		<BrowserRouter>
			<header className="max-w-md mx-auto h-1/10">
				<h1 className="text-xl">Filmder</h1>
			</header>
			<main className="max-w-md mx-auto h-8/10 relative">
				<Routes>
					<Route index element={<Home />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignUpPage />} />
					<Route path="/Profile" element={<Profile />} />
				</Routes>
			</main>
			<footer className="max-w-md mx-auto h-1/10">
				<Navbar />
			</footer>
		</BrowserRouter>
	</StrictMode>,
);
