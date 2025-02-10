import { useState } from "react";
import { BsHandThumbsUp } from "react-icons/bs";
import { BsHandThumbsDown } from "react-icons/bs";

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
			className="fixed bottom-20 right-10 flex items-center gap-2 text-white px-4 py-2 rounded-lg hover:opacity-80 transition cursor-pointer bg-positive"
		>
			<BsHandThumbsUp className="text-white" size={20} />
			Like
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
			className="fixed bottom-20 left-10 flex items-center gap-2 text-white px-4 py-2 rounded-lg hover:opacity-80 transition cursor-pointer bg-negative"
		>
			<BsHandThumbsDown className="text-white" size={20} />
			Pass
		</button>
	);
};

export default App;
