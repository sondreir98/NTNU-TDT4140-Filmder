import { useEffect, useState } from "react";
import { auth } from "./Database";
import { getDislikedMovies, getLikedMovies } from "./DatabaseAccess";
import type { Film } from "./Movies";

function Profile() {
	const [selectedCategory, setSelectedCategory] = useState("liked");
	const [likedMovies, setLikedMovies] = useState<Film[]>([]);
	const [dislikedMovies, setDislikedMovies] = useState<Film[]>([]);
	const [user, setUser] = useState(null);

	// Henter filmer fra db
	useEffect(() => {
		async function fetchMovies() {
			const liked = await getLikedMovies();
			console.log("Fetched liked movies:", liked);
			console.log("User is:", auth.currentUser);
			const disliked = await getDislikedMovies();
			setLikedMovies(liked);
			setDislikedMovies(disliked);
		}
		fetchMovies();
	}, []);

	const moviesToShow =
		selectedCategory === "liked" ? likedMovies : dislikedMovies;

	return (
		<div className="relative h-full bg-gray-100 p-4 flex flex-col items-center">
			<h1 className="absolute top-4 text-2xl font-bold">Profile Page</h1>

			<img
				src="https://images.desenio.com/zoom/18823_1.jpg"
				alt="Profile"
				className="w-40 h-40 rounded-full mt-16 border-4 border-gray-500"
			/>

			<p className="mt-2 text-lg font-semibold">{auth.currentUser?.displayName || "Username"}</p>

			<p className="text-gray-600">{auth.currentUser?.email || "email@example.com"}</p>

			<div className="w-full max-w-lg bg-white p-4 rounded-lg shadow-lg mb-3 mt-3">
				<label
					htmlFor="movieFilter"
					className="text-lg font-semibold text-gray-700 mb-2 block"
				>
					Show:
				</label>
				<select
					id="movieFilter"
					className="w-full p-3 border rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
					value={selectedCategory}
					onChange={(e) => setSelectedCategory(e.target.value)}
				>
					<option value="liked">Liked Movies</option>
					<option value="disliked">Disliked Movies</option>
				</select>
			</div>

			
			<div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
				<h2 className="text-2xl font-semibold text-gray-800 mb-4">
					{selectedCategory === "liked" ? "Liked Movies" : "Disliked Movies"}
				</h2>

				
				<div className="h-58 max-h-80 overflow-y-auto p-2 border border-gray-300 rounded-lg bg-gray-50">
					{moviesToShow.length > 0 ? (
						<ul className="space-y-4">
							{moviesToShow.map((movie) => (
								<li
									key={movie.name}
									className="p-4 rounded-lg border border-gray-200 shadow-sm bg-white"
								>
									<p className="text-xl font-semibold text-gray-800">
										{movie.name}
									</p>
									<p className="text-sm text-gray-600">{movie.year}</p>
									<p className="text-gray-500 mt-2">{movie.info}</p>
									<p className="text-sm text-gray-400 mt-2">
										{movie.genre.join(", ")}
									</p>
								</li>
							))}
						</ul>
					) : (
						<p className="text-gray-500 text-center">No movies found</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default Profile;
