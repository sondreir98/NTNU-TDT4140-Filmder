import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./Home.tsx";
import Navbar from "./Navbar.tsx";
import Profile from "./Profile.tsx";
import ProfilePageButton from "./ProfilePageButton.tsx";
import SearchFriends from "./SearchFriends.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import LoginPage from "./pages/loginpage.tsx";
import Friends from "./Friends.tsx";

const Header = () => {
	const location = useLocation();

	return (
		<header className="max-w-md mx-auto h-1/20 flex justify-between items-center p-4">
			<h1 className="text-xl">Filmder</h1>
			{!["/login", "/signup"].includes(location.pathname) && (
				<ProfilePageButton />
			)}
		</header>
	);
};

createRoot(
	document.querySelector(":root > body > #react-root") as HTMLDivElement,
).render(
	<StrictMode>
		<BrowserRouter>
			<Header />
			<main className="max-w-md mx-auto h-17/20 relative">
				<Routes>
					<Route index element={<Home />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignUpPage />} />
					<Route path="/Profile" element={<Profile />} />
					<Route path="/Friends" element={<Friends />} />
				</Routes>
			</main>
			<footer className="max-w-md mx-auto h-2/20">
				<Navbar />
			</footer>
		</BrowserRouter>
	</StrictMode>,
);
