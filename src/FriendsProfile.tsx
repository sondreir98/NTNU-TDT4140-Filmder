import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth } from "./Database";
import {
	getFriend,
	getFriendsDislikedMovies,
	getFriendsLikedMovies,
} from "./DatabaseAccess";
import type { Film } from "./Movies";

//kode utviklet med hjelp av KI
function FriendsProfile() {
	const { friendId } = useParams();
	const [friend, setFriend] = useState<{
		username: string;
		avatarPath: string;
	} | null>(null);
	const [likedMovies, setLikedMovies] = useState<Film[]>([]);
	const [dislikedMovies, setDislikedMovies] = useState<Film[]>([]);
	const [selectedCategory, setSelectedCategory] = useState("liked");

	useEffect(() => {
		async function fetchFriendData() {
			if (!friendId) return;

			const friendData = await getFriend(friendId);
			setFriend(friendData);

			const liked = await getFriendsLikedMovies(friendId);
			const disliked = await getFriendsDislikedMovies(friendId);
			setLikedMovies(liked);
			setDislikedMovies(disliked);
		}
		fetchFriendData();
	}, [friendId]);

	const moviesToShow =
		selectedCategory === "liked" ? likedMovies : dislikedMovies;

	if (!friend) return <p className="text-center text-gray-500">Loading...</p>;
	return (
		<div className="bg-gray-100 p-4 flex flex-col items-center h-full">
			{friend.avatarPath && (
				<img
					src={friend.avatarPath}
					alt="Profile"
					className="w-30 h-30 rounded-full border-4 border-gray-500"
				/>
			)}

			<p className="mt-2 text-lg font-semibold">
				{friend?.username || "Username"}
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

				<div className="h-60 flex-grow min-h-0 mt-2 overflow-y-auto p-2 border border-gray-300 rounded-lg bg-gray-50">
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

export default FriendsProfile;
