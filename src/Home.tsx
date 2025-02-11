import { useState } from "react";

type FilmTest = { name: string; year: number; genre: string[]; info: string };

const dummyMovie: FilmTest = {
	name: "Dummy Movie",
	year: 2024,
	genre: ["Action", "Adventure"],
	info: "En testfilm",
};

function App() {
	const [likedMovies, setLikedMovies] = useState<FilmTest[]>([]);
	const [dislikedMovies, setDislikedMovies] = useState<FilmTest[]>([]);

	return (
		<>
			<h1 className="text-xl">Filmder</h1>
			<LikeButton setLikedMovies={setLikedMovies} />
			<DisLikeButton setDislikedMovies={setDislikedMovies} />
		</>
	);
}

interface ButtonProps {
	setLikedMovies?: React.Dispatch<React.SetStateAction<FilmTest[]>>;
	setDislikedMovies?: React.Dispatch<React.SetStateAction<FilmTest[]>>;
}

const LikeButton: React.FC<ButtonProps> = ({ setLikedMovies }) => {
	return (
		<button
			onClick={() => {
				if (setLikedMovies) {
					setLikedMovies((prev) => [...prev, dummyMovie]);
				}
			}}
			type="button"
			className="fixed bottom-20 right-10 flex items-center gap-2 text-white px-4 py-2 rounded-lg hover:opacity-80 transition cursor-pointer bg-positive w-[120px]"
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

const DisLikeButton: React.FC<ButtonProps> = ({ setDislikedMovies }) => {
	return (
		<button
			onClick={() => {
				if (setDislikedMovies) {
					setDislikedMovies((prev) => [...prev, dummyMovie]);
				}
			}}
			type="button"
			className="fixed bottom-20 left-10 flex items-center gap-2 text-white px-4 py-2 rounded-lg hover:opacity-80 transition cursor-pointer bg-negative w-[125px]"
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
