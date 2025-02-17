import { NavLink } from "react-router-dom";
import { HomeIcon, SearchIcon, UsersIcon } from "./Icons";

function Navbar() {
	return (
		<nav className="fixed bottom-0 w-full bg-white shadow-lg p-10">
			<div className="flex justify-around items-center -mx-4">
				<NavLink
					to="/Friends"
					className="flex flex-col items-center text-dark hover:text-blue-500"
				>
					<UsersIcon />
					<span className="text-sm">Friends</span>
				</NavLink>
				<NavLink
<<<<<<< HEAD
					to="/"
=======
					to="/Home"
>>>>>>> e9d0e0a7d49fcb82d5cd401074cd7c7b143e1c44
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
			</div>
		</nav>
	);
}

export default Navbar;
