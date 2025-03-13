import type React from "react";
import { useNavigate } from "react-router-dom";

export const ProfilePageButton: React.FC = () => {
	const navigate = useNavigate();
	return (
		<button
			onClick={() => navigate("/Profile")}
			type="button"
			className="top-10 right-10 bg-primary text-white px-4 py-2 rounded-lg hover:opacity-80 transition cursor-pointer"
		>
			<img
				src="https://www.svgrepo.com/show/343494/profile-user-account.svg"
				alt="Go to profile"
				className="w-4 h-4"
			/>
		</button>
	);
};
