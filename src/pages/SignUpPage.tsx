import { useState } from "react";
import { Link } from "react-router-dom"; 

const SignUpPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [username, setUsername] = useState("");

	return (
		//Fargene endres til slutt
		<div className="flex flex-col items-center justify-center min-h-screen bg-primary text-white">
			<h1 className="text-4xl font-bold mb-8">Create your Account</h1>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className="shadow mb-4 px-4 py-4 rounded-[2vw] w-80 mt-50 font-semibold text-white bg-blue-400/50 focus:outline-none focus:ring-2 focus:ring-gray-300 ease-linear transition duration-500 "
			/>
			<input
				type="text"
				placeholder="Username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				className="shadow mb-4 px-4 py-4 w-80 rounded-[2vw] bg-blue-400/50 font-semibold text-white focus:outline-none focus:ring-2 focus:ring-gray-300 ease-linear transition duration-500"
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className="shadow mb-4 px-4 py-4 w-80 rounded-[2vw] bg-blue-400/50 font-semibold text-white focus:outline-none focus:ring-2 focus:ring-gray-300 ease-linear transition duration-500"
			/>
			<input
				type="password"
				placeholder="Confirm Password"
				value={confirmPassword}
				onChange={(e) => setConfirmPassword(e.target.value)}
				className="shadow mb-4 px-4 py-4 w-80 rounded-[2vw] bg-blue-400/50 font-semibold text-white focus:outline-none focus:ring-2 focus:ring-gray-300 ease-linear transition duration-500"
			/>
			<button
				type="button"
				onClick={() => console.log("Sign Up clicked")}
				className="border-2 border-white w-80 px-6 py-3 rounded-[2vw] text-lg font-semibold shadow-md hover:bg-gray-200 transition"
			>
				Sign Up
			</button>
			<p className="mt-4">
				Already have an account?{" "}
				<Link
					to="/login"
					className="text-blue-400 font-semibold hover:underline"
				>
					Log In
				</Link>
			</p>
		</div>
	);
};

export default SignUpPage;
