import { BsHandThumbsUp } from "react-icons/bs";
import { BsHandThumbsDown } from "react-icons/bs";

function App() {
	return (
		<>
			<h1 className="text-xl">Filmder</h1>
			<LikeButton />
			<DisLikeButton />
		</>
	);
}

const LikeButton: React.FC = () => {
	return (
		<button
			type="button"
			className="fixed bottom-30 right-10 flex items-center gap-2 text-white px-4 py-2 rounded-lg hover:opacity-80 transition cursor-pointer"
			style={{ backgroundColor: "var(--color-positive)" }}
		>
			<BsHandThumbsUp className="text-white" size={20} />
			Liker
		</button>
	);
};

const DisLikeButton: React.FC = () => {
	return (
		<button
			type="button"
			className="fixed bottom-30 left-10 flex items-center gap-2 text-white px-4 py-2 rounded-lg hover:opacity-80 transition cursor-pointer"
			style={{ backgroundColor: "var(--color-negative)" }}
		>
			<BsHandThumbsDown className="text-white" size={20} />
			Pass
		</button>
	);
};

export default App;
