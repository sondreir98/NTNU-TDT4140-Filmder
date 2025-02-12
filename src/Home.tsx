import { useEffect, useState } from "react";
import { getMovieByGenre, newMovie, randomMovie } from "./Algoritme";
import { type FilmTest, dummyMovies } from "./Movies";

function App() {
	const [likedMovies, setLikedMovies] = useState<FilmTest[]>([]);
	const [dislikedMovies, setDislikedMovies] = useState<FilmTest[]>([]);
	const [notDisplayed, setNotDisplayed] = useState<FilmTest[]>([
		...dummyMovies,
	]);
	const [currentMovie, setCurrentMovie] = useState<FilmTest | null>(
		notDisplayed[0] || null,
	);

	//dette er for at loggingen skal ha med nyeste endringer
	useEffect(() => {
		console.log("Updated likedMovies list:", likedMovies);
	}, [likedMovies]);

	useEffect(() => {
		console.log("Updated disLikedMovies list:", dislikedMovies);
	}, [dislikedMovies]);

	const getNextMovie = () => {
		if (notDisplayed.length > 0) {
			const nextMovie = randomMovie(likedMovies, notDisplayed);
			setCurrentMovie(nextMovie);
		} else {
			alert("You have seen all movies!");
			setNotDisplayed([...dummyMovies]);
		}
	};

	const handleLike = () => {
		if (currentMovie) {
			setLikedMovies((prev) => [...prev, currentMovie]);
			console.log("Updated likedMovies list: ", likedMovies);
			setNotDisplayed((prev) =>
				prev.filter((movie) => movie.name !== currentMovie.name),
			);
			getNextMovie();
		}
	};

	const handleDislike = () => {
		if (currentMovie) {
			setDislikedMovies((prev) => [...prev, currentMovie]);
			console.log("Updated disLikedMovies list: ", dislikedMovies);
			setNotDisplayed((prev) =>
				prev.filter((movie) => movie.name !== currentMovie.name),
			);
			getNextMovie();
		}
	};

	return (
		<>
			<h1 className="text-xl">Filmder</h1>
			<div className="flex justify-center items-center mt-4">
				<h2 className="text-2xl font-bold">
					{currentMovie ? currentMovie.name : "Loading..."}
				</h2>
			</div>
			<LikeButton handleLike={handleLike} />
			<DisLikeButton handleDislike={handleDislike} />
		</>
	);
}

interface ButtonProps {
	handleLike?: () => void;
	handleDislike?: () => void;
}

const LikeButton: React.FC<ButtonProps> = ({ handleLike }) => {
	return (
		<button
			onClick={handleLike}
			type="button"
			className="fixed bottom-20 right-10 flex justify-center items-center gap-1 text-white px-4 py-2 rounded-lg hover:opacity-80 transition cursor-pointer bg-positive w-[120px]"
		>
			<img
				src="https://img.icons8.com/?size=100&id=2744&format=png&color=FFFFFF"
				alt="Like"
				className="w-6 h-6"
			/>
			<span>Like</span>
		</button>
	);
};

const DisLikeButton: React.FC<ButtonProps> = ({ handleDislike }) => {
	return (
		<button
			onClick={handleDislike}
			type="button"
			className="fixed bottom-20 left-10 flex justify-center items-center gap-1 text-white px-4 py-2 rounded-lg hover:opacity-80 transition cursor-pointer bg-negative w-[125px]"
		>
			<img
				src="https://img.icons8.com/?size=100&id=2913&format=png&color=FFFFFF"
				alt="Dislike"
				className="w-6 h-6"
			/>
			<span>Dislike</span>
		</button>
	);
};

export default App;
