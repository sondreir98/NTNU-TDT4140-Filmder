import { useCallback, useEffect, useState } from "react";
import { nextMovie } from "./Algoritme";
import { dislikeMovie, likeMovie } from "./DatabaseAccess";
import type { Film } from "./Movies";

function Home() {
	const genres = ["action", "comedy", "drama", "horror", "romance", "sci-fi"];
	const [noMoreMovies, setNoMoreMovies] = useState<boolean>(false);
	const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
	const [selectedGenres, setSelectedGenres] = useState<string[]>(genres);
	const [selectedYear, setSelectedYear] = useState<number | null>(null);
	const [currentMovie, setCurrentMovie] = useState<Film | null>(null);

	useEffect(() => {
		updateMovie();
	}, []);

	const updateMovie = useCallback(() => {
		async function ineractWithDatabase() {
			const newMovie = await nextMovie(selectedGenres, selectedYear);
			setCurrentMovie(newMovie);
			if (newMovie === null) {
				setNoMoreMovies(true);
			} else {
				setNoMoreMovies(false);
			}
		}
		ineractWithDatabase();
	}, [selectedGenres, selectedYear]);

	const handleLike = useCallback(() => {
		async function ineractWithDatabase() {
			if (currentMovie !== null) {
				await likeMovie(currentMovie.movieId);
			}
			const newMovie = await nextMovie(selectedGenres, selectedYear);
			setCurrentMovie(newMovie);
			if (newMovie === null) {
				setNoMoreMovies(true);
			} else {
				setNoMoreMovies(false);
			}
		}
		ineractWithDatabase();
	}, [currentMovie, selectedGenres, selectedYear]);

	const handleDislike = useCallback(() => {
		async function ineractWithDatabase() {
			if (currentMovie !== null) {
				await dislikeMovie(currentMovie.movieId);
			}
			const newMovie = await nextMovie(selectedGenres, selectedYear);
			setCurrentMovie(newMovie);
			if (newMovie === null) {
				setNoMoreMovies(true);
			} else {
				setNoMoreMovies(false);
			}
		}
		ineractWithDatabase();
	}, [currentMovie, selectedGenres, selectedYear]);

	//C: Kode lagt til for filtrering (linje 69-94)
	const handleFilterToggle = () => {
		setIsFilterOpen((prev) => !prev);
	};
	const handleGenreChange = (genre: string) => {
		setSelectedGenres((prev) =>
			prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
		);
	};
	const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		let year: number | null = Number.parseInt(event.target.value);
		if (Number.isNaN(year)) {
			year = null;
		}
		setSelectedYear(year);
	};
	const applyFilter = () => {
		updateMovie();
		setIsFilterOpen(false);
	};

	return (
		<>
			<div className="w-full h-full">
				{currentMovie !== null ? (
					<img
						className="w-full h-full"
						src={currentMovie.logoPath}
						alt={currentMovie.name}
					/>
				) : noMoreMovies ? (
					<h2 className="w-full text-center text-2xl font-bold">
						No more movies
					</h2>
				) : (
					<h2 className="text-centertext-2xl font-bold">Loading...</h2>
				)}
			</div>

			<LikeButton handleLike={handleLike} />
			<DisLikeButton handleDislike={handleDislike} />

			{/*C: Kode lagt til for filtrering (linje 112-179)*/}
			<button
				onClick={handleFilterToggle}
				type="button"
				className="absolute top-2 right-4 bg-secondary text-white px-4 py-2 rounded-lg hover:opacity-80 transition cursor-pointer"
			>
				<img
					src="https://cdn.jsdelivr.net/npm/heroicons@1.0.6/outline/filter.svg"
					alt="Filter"
					className="w-4 h-4"
				/>
			</button>

			{isFilterOpen && (
				<div className="absolute inset-0 flex items-center justify-center bg-grey bg-opacity-50">
					<div className="bg-white p-6 rounded-lg shadow-lg w-3/4 relative">
						<button
							onClick={handleFilterToggle}
							type="button"
							className="bg-gray-300 text-sm px-2 py-1 rounded hover:bg-gray-400 transition"
						>
							Close
						</button>

						<h2 className="text-lg font-semibold mb-4">Filter Movies</h2>

						<div className="grid grid-cols-2 gap-2 mb-4">
							{genres.map((genre) => (
								<label key={genre} className="flex items-center">
									<input
										type="checkbox"
										checked={selectedGenres.includes(genre)}
										onChange={() => handleGenreChange(genre)}
										className="mr-2"
									/>
									{genre}
								</label>
							))}
						</div>

						<div className="mb-4">
							<label
								htmlFor="yearInput"
								className="block text-sm font-semibold mb-1"
							>
								Distribution Year:
							</label>
							<input
								id="yearInput"
								type="number"
								value={selectedYear === null ? "" : selectedYear}
								onChange={handleYearChange}
								className="w-full border p-2 rounded"
								placeholder="Enter year (e.g. 2005)"
								min="1960"
								max="2025"
							/>
						</div>

						<button
							onClick={applyFilter}
							type="button"
							className="mt-4 bg-primary text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
						>
							Apply Filter
						</button>
					</div>
				</div>
			)}
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
			className="absolute bottom-32 right-10 flex justify-center items-center gap-1 text-white px-4 py-2 rounded-lg hover:opacity-80 transition cursor-pointer bg-positive w-[120px]"
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
			className="absolute bottom-32 left-10 flex justify-center items-center gap-1 text-white px-4 py-2 rounded-lg hover:opacity-80 transition cursor-pointer bg-negative w-[125px]"
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

export default Home;
