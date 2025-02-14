import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Database";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleLogin = async () => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
			setError("");
			navigate("/");
		} catch (err) {
			if (err instanceof FirebaseError) {
				setError("The email or password you provided is incorrect.");
			} else {
				setError("An unknown error occurred.");
			}
		}
	};

	return (
		//Fargene endres til slutt
		<div className="flex flex-col items-center justify-center min-h-screen bg-secondary text-dark">
			<h1 className="text-4xl font-bold mb-8">Filmder</h1>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className="shadow mb-4 px-4 py-4 rounded-[2vw] w-80 mt-70 text-dark font-semibold bg-primary focus:outline-none focus:ring-2 focus:ring-dark ease-linear transition duration-200 "
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className="shadow mb-4 px-4 py-4 w-80 rounded-[2vw] bg-primary text-dark font-semibold focus:outline-none focus:ring-2 focus:ring-dark ease-linear transition duration-200"
			/>

			<div className="flex flex-col gap-4">
				<button
					type="button"
					onClick={handleLogin}
					className="border-2 border-dark w-80 px-6 py-3 rounded-[2vw] text-lg font-semibold shadow-md bg-primary text-dark hover:bg-gray-200 transition"
				>
					Log In
				</button>
				{error && (
					<div className="flex flex-col items-center justify-center text-red-500 font-semibold text-sm mt-1">
						<p>{error}</p>
					</div>
				)}
				<div className="text-center mt-0">
					<p className="text-sm">
						Don't have an account?{" "}
						<Link
							to="/signup"
							className="text-blue-400 font-bold hover:underline"
						>
							Sign Up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
