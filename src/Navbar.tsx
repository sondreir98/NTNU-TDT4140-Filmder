import { HomeIcon, MagnifyingGlassIcon, UsersIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="fixed bottom-0 w-full bg-white shadow-lg p-10">
        <div className="flex justify-around items-center -mx-4">
            <Link to="/Friends" className="flex flex-col items-center text-dark hover:text-blue-500">
                <UsersIcon className="h-6 w-6" />
                <span className="text-sm">Friends</span>
            </Link>
            <Link to="/Home" className="flex flex-col items-center text-dark hover:text-blue-500">
                <HomeIcon className="h-6 w-6" />
                <span className="text-sm">Home</span>
            </Link>
            <Link to="/Search" className="flex flex-col items-center text-dark hover:text-blue-500">
                <MagnifyingGlassIcon className="h-6 w-6" />
                <span className="text-sm">Search</span>
            </Link>
        </div>
        </nav>
    );
}

export default Navbar;