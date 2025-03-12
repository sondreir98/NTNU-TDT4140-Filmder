import { useEffect, useState } from "react";
import { auth } from "./Database";
import {
	getDislikedMovies,
	getLikedMovies,
	getUser,
	setAvatar,
} from "./DatabaseAccess";
import type { Film } from "./Movies";
import { getRandomMovie } from "./RandomMovie";

function Profile() {
	const [selectedCategory, setSelectedCategory] = useState("liked");
	const [likedMovies, setLikedMovies] = useState<Film[]>([]);
	const [dislikedMovies, setDislikedMovies] = useState<Film[]>([]);
	const [user, setUser] = useState(null);
	const [userAvatar, setUserAvatar] = useState<string | null>(null);
	const [isAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
	const [randomMovie, setRandomMovie] = useState<Film | null>(null);

	const presetAvatars = [
		"/avatars/avatar1.jpg",
		"/avatars/avatar2.jpg",
		"/avatars/avatar3.jpg",
		"/avatars/avatar4.jpg",
		"/avatars/avatar5.jpg",
		"/avatars/avatar6.jpg",
	];

	// Henter filmer fra db
	useEffect(() => {
		async function fetchMovies() {
			const user = await getUser();
			const avatar = user?.avatarPath;
			const disliked = await getDislikedMovies();
			const liked = await getLikedMovies();
			console.log("Fetched liked movies:", liked);
			console.log("User is:", auth.currentUser);

			setLikedMovies(liked);
			setDislikedMovies(disliked);
			setUserAvatar(avatar ?? "https://images.desenio.com/zoom/18823_1.jpg");
		}
		fetchMovies();
	}, []);

	//uferdig
	async function showRandomMovie() {
		const movie = await getRandomMovie();
		if (movie) {
			setRandomMovie(movie);
		} else {
			alert("No liked movies found!");
		}
	}

	const closeRandomMoviePopup = () => {
		setRandomMovie(null);
	};

	const handleAvatarSelect = async (avatarPath: string) => {
		try {
			await setAvatar(avatarPath);
			setUserAvatar(avatarPath);
			setIsAvatarPopupOpen(false); // Lukker popup
		} catch (error) {
			console.error("Failed to update avatar:", error);
		}
	};

	const moviesToShow =
		selectedCategory === "liked" ? likedMovies : dislikedMovies;

	return (
		<div className="bg-gray-100 p-4 flex flex-col items-center">
			{userAvatar && (
				<img
					src={userAvatar}
					alt="Profile"
					className="w-30 h-30 rounded-full border-4 border-gray-500"
				/>
			)}

			<button
				type="button"
				onClick={() => setIsAvatarPopupOpen(true)}
				className="mt-4 bg-primary text-white px-4 py-2 rounded-lg"
			>
				Change Avatar
			</button>

			{isAvatarPopupOpen && (
				<div className="fixed inset-0 bg-primary bg-opacity-50 flex justify-center items-center">
					<div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
						<h2 className="text-lg font-semibold mb-4">Select an Avatar</h2>

						<div className="grid grid-cols-3 gap-4">
							{presetAvatars.map((avatar) => (
								<button
									key={avatar}
									type="button"
									className="w-16 h-16 rounded-full border-2 border-gray-300 hover:opacity-75 focus:ring-2 focus:ring-blue-500"
									onClick={() => handleAvatarSelect(avatar)}
								>
									<img
										src={avatar}
										alt="Avatar option"
										className="w-full h-full rounded-full"
									/>
								</button>
							))}
						</div>

						<button
							type="button"
							onClick={() => setIsAvatarPopupOpen(false)}
							className="mt-4 bg-primary text-white px-3 py-1 rounded"
						>
							Close
						</button>
					</div>
				</div>
			)}

			<p className="mt-2 text-lg font-semibold">
				{auth.currentUser?.displayName || "Username"}
			</p>

			<p className="text-gray-600">
				{auth.currentUser?.email || "email@example.com"}
			</p>

			<div className="w-full max-w-lg bg-white p-4 rounded-lg shadow-lg mb-1 mt-3 flex-col">
				<label
					htmlFor="movieFilter"
					className="font-semibold text-gray-700 mb-2 block"
				>
					Show:
				</label>
				<select
					id="movieFilter"
					className="w-34 p-1.5 mr-2 border rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
					value={selectedCategory}
					onChange={(e) => setSelectedCategory(e.target.value)}
				>
					<option value="liked">Liked Movies</option>
					<option value="disliked">Disliked Movies</option>
				</select>

				<button
					type="button"
					onClick={() => showRandomMovie()}
					className="bg-primary text-white px-4 py-2 rounded-lg text-sm"
				>
					Random Liked Movie!
				</button>

				{randomMovie && (
					<div className="fixed inset-0 bg-primary bg-opacity-50 flex justify-center items-center">
						<div className="bg-white p-6 rounded-lg shadow-lg text-center w-80 relative">
							<div className="w-full h-48 overflow-hidden flex justify-center items-center">
								<img
									src={randomMovie.logoPath}
									alt={randomMovie.name}
									className="max-w-[90%] max-h-50 object-contain rounded-lg"
								/>
							</div>

							<h2 className="text-xl font-bold mt-4">{randomMovie.name}</h2>
							<p className="text-sm text-gray-600">{randomMovie.year}</p>
							<p className="text-gray-500 mt-2">{randomMovie.info}</p>
							<p className="text-sm text-gray-400 mt-2">
								{randomMovie.genre.join(", ")}
							</p>

							<button
								type="button"
								onClick={closeRandomMoviePopup}
								className="mt-4 bg-negative text-white px-4 py-2 rounded-lg"
							>
								Close
							</button>
						</div>
					</div>
				)}

				<div className="h-42 flex-grow min-h-0 mt-2 overflow-y-auto p-2 border border-gray-300 rounded-lg bg-gray-50">
					{moviesToShow.length > 0 ? (
						<ul className="space-y-4">
							{moviesToShow.map((movie) => (
								<li
									key={movie.name}
									className="p-4 rounded-lg border border-gray-200 shadow-sm bg-white"
								>
									<p className="text-l font-semibold text-gray-800">
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
