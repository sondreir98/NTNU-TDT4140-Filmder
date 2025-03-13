import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UseFriends from "./GetFriends";
import type { Film } from "./Movies";
import { getSortedLikedMoviesAmongFriends } from "./TopFive";

export type Friend = {
	id: string;
	name: string;
	avatar: string;
};

type User = {
	friends: string[];
	username: string;
};

function Friends() {
	const [movies, setMovies] = useState<Film[]>([]);
	const [selectedMovie, setSelectedMovie] = useState<Film | null>(null);
	const { friends, loading } = UseFriends();

	useEffect(() => {
		async function fetchMovies() {
			const moviesAll = await getSortedLikedMoviesAmongFriends();
			setMovies(moviesAll.slice(0, 5));
		}
		fetchMovies();
	}, []);

	const handleInfoToggle = (movie: Film) => {
		setSelectedMovie((prev) =>
			prev && prev.movieId === movie.movieId ? null : movie,
		);
	};
	return (
		<div className="mb-6">
			<h2 className="text-2xl font-bold mb-1">Friend's Top Choices</h2>
			<div className="overflow-x-auto whitespace-nowrap">
				<div className="flex space-x-6">
					{movies.length > 0 ? (
						movies.map((movie) => (
							<div
								key={movie.movieId}
								className="w-32 flex-shrink-0 relative m-0 p-0"
							>
								<button
									onClick={() => handleInfoToggle(movie)}
									type="button"
									className="absolute top-[0px] left-[0px] text-white px-4 py-2 rounded-lg hover:opacity-40 transition cursor-pointer z-[0px]"
								>
									ℹ️
								</button>
								<img
									src={movie.logoPath}
									alt={movie.name}
									className="w-full h-40 object-cover rounded-lg"
								/>
								<p className="text-sm mt-1 text-center truncate">
									{movie.name}
								</p>
								{}
							</div>
						))
					) : (
						<div className="w-32 h-40 flex items-center justify-center text-gray-500 border rounded-lg">
							No movies
						</div>
					)}
				</div>
			</div>

			{selectedMovie && (
				<div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white p-6 rounded-lg max-w-sm w-full">
						<h2 className="text-lg font-bold mb-4">{selectedMovie.name}</h2>
						<p className="text-center">{selectedMovie.info}</p>
						<button
							onClick={() => setSelectedMovie(null)}
							type="button"
							className="mt-4 w-full bg-gray-200 hover:bg-gray-300 py-2 rounded-lg"
						>
							Close
						</button>
					</div>
				</div>
			)}

			<div className="p-4 bg-white rounded-lg">
				<div className="flex items-center gap-2 mb-1">
					<h2 className="text-2xl font-bold mb-1">Friends</h2>
					<NavLink
						to="/SearchFriends"
						className={({ isActive }) =>
							`bg-primary hover:text-blue-500" text-black px-3 py-1 rounded-lg transition text-sm ${isActive ? "bg-blue-700" : ""}`
						}
						aria-label="Add"
					>
						Add
					</NavLink>
				</div>
				<ul className="h-70 overflow-x-auto overflow-y-auto">
					{friends.length > 0 ? (
						friends.map((friend) => (
							<li
								key={friend.id}
								className="flex items-center gap-4 p-2 border-b last:border-none"
							>
								<NavLink
									to={`/friends/${friend.id}`}
									className="flex items-center gap-4"
								>
									<img
										src={friend.avatar}
										alt={friend.name}
										className="w-12 h-12 rounded-full"
									/>
									<span className="text-lg">{friend.name}</span>
								</NavLink>
							</li>
						))
					) : (
						<div className="p-4 text-center text-gray-500">
							No friends found
						</div>
					)}
				</ul>
			</div>
		</div>
	);
}

export default Friends;