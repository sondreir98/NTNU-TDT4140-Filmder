import { NavLink } from "react-router-dom";
import { HomeIcon, SearchIcon, UsersIcon } from "./Icons";

function Navbar() {
	return (
		<nav className="flex justify-around items-center w-full bg-white shadow-lg h-full">
			<NavLink
				to="/Friends"
				className="flex flex-col items-center text-dark hover:text-blue-500"
			>
				<UsersIcon />
				<span className="text-sm">Friends</span>
			</NavLink>
			<NavLink
				to="/"
				className="flex flex-col items-center text-dark hover:text-blue-500"
			>
				<HomeIcon />
				<span className="text-sm">Home</span>
			</NavLink>
			<NavLink
				to="/Search"
				className="flex flex-col items-center text-dark hover:text-blue-500"
			>
				<SearchIcon />
				<span className="text-sm">Search</span>
			</NavLink>
		</nav>
	);
}

export default Navbar;
