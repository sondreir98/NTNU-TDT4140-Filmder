import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../Database";

const SignUpPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [username, setUsername] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); //Hindrer redirect ved error?
		if (password !== confirmPassword) {
			setError("Passwords do not match.");
			return;
		}
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			);
			await updateProfile(userCredential.user, {displayName: username});
			await setDoc(doc(db, "users", userCredential.user.uid), {
				email: userCredential.user.email,
				username: userCredential.user.displayName,
				friends: [],
			});
			setError("");
			navigate("/");
		} catch (err) {
			if (err instanceof FirebaseError) {
				setError("Failed to create account. Please try again.");
			} else {
				setError("An unknown error occurred.");
			}
		}
	};

	return (
		//Fargene endres til slutt
		<div className="flex flex-col items-center justify-center h-full bg-primary text-white">
			<h1 className="text-4xl font-bold mb-8">Create your Account</h1>
			<form onSubmit={handleSignUp} className="flex flex-col items-center">
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="shadow mb-4 px-4 py-4 rounded-[2vw] w-80 mt-35 font-semibold text-white bg-blue-400/50 focus:outline-none focus:ring-2 focus:ring-gray-300 ease-linear transition duration-500 "
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
				<div className="flex flex-col gap-4">
					<button
						type="submit"
						className="border-2 border-white w-80 px-6 py-3 rounded-[2vw] text-lg font-semibold shadow-md hover:bg-gray-200 transition"
					>
						Sign Up
					</button>
					{error && (
						<div className="flex flex-col items-center justify-center text-red-500 font-semibold text-sm mt-1">
							<p>{error}</p>
						</div>
					)}
				</div>
			</form>
			<div className="text-center mt-3">
				<p className="text-sm">
					Already have an account?{" "}
					<Link
						to="/login"
						className="text-blue-400 font-semibold hover:underline"
					>
						Log In
					</Link>
				</p>
			</div>
		</div>
	);
};

export default SignUpPage;
