import { useEffect, useState } from "react";
import { getMovieByGenre, newMovie, randomMovie } from "./Algoritme";
import { type FilmTest, dummyMovies } from "./Movies";
import { getMovieByYear,getMovieByGenres } from "./Filtrering";

function App() {
    const [likedMovies, setLikedMovies] = useState<FilmTest[]>([]);
    const [dislikedMovies, setDislikedMovies] = useState<FilmTest[]>([]);
    const [notDisplayed, setNotDisplayed] = useState<FilmTest[]>([
        ...dummyMovies,
    ]);
    const [currentMovie, setCurrentMovie] = useState<FilmTest | null>(
        notDisplayed[0] || null,
    );

    //C: Kode lagt til for filtrering (5 linjer)
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false); 
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]); 
    const [selectedYear, setSelectedYear] = useState<number | "">("");
    const genres = ["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi"];
    //

    //dette er for at loggingen skal ha med nyeste endringer
    useEffect(() => {
        console.log("Updated likedMovies list:", likedMovies);
    }, [likedMovies]);

    useEffect(() => {
        console.log("Updated disLikedMovies list:", dislikedMovies);
    }, [dislikedMovies]);

	// C: Endret litt her (linje 33-70)
	const getNextMovie = () => {
		let availableMovies = notDisplayed;
		if (selectedGenres.length > 0) {
			availableMovies = availableMovies.filter(movie =>
				movie.genre.some(g => selectedGenres.includes(g))
			);
		}
		if (selectedYear) {
			availableMovies = availableMovies.filter(movie => movie.year === selectedYear);
		}
		if (availableMovies.length > 0) {
			const nextMovie = randomMovie(likedMovies, availableMovies);
			setCurrentMovie(nextMovie);
		} else {
			alert("No more movies match your filters!");
			setNotDisplayed([...dummyMovies]);
		}
	};
	
	const handleLike = () => {
		if (currentMovie) {
			setLikedMovies((prev) => [...prev, currentMovie]);
			setNotDisplayed((prev) =>
				prev.filter((movie) => movie.name !== currentMovie.name),
			);
			getNextMovie();
		}
	};
	
	const handleDislike = () => {
		if (currentMovie) {
			setDislikedMovies((prev) => [...prev, currentMovie]);
			setNotDisplayed((prev) =>
				prev.filter((movie) => movie.name !== currentMovie.name),
			);
			getNextMovie(); 
		}
	};

    //C: Kode lagt til for filtrering (linje 73-98)
    const handleFilterToggle = () => { 
        setIsFilterOpen((prev) => !prev);
    };
    const handleGenreChange = (genre: string) => { 
        setSelectedGenres((prev) =>
            prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
        );
    };
    const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
        const year = event.target.value;
        setSelectedYear(year === "" ? "" : Number.parseInt(year));
    };
    const applyFilter = () => { 
        let filtered = dummyMovies;
    	if (selectedGenres.length > 0) {
        	filtered = filtered.filter(movie =>
            	movie.genre.some(g => selectedGenres.includes(g))
        	);
    	}
    	if (selectedYear) {
        	filtered = filtered.filter(movie => movie.year === selectedYear);
    	}
    	setNotDisplayed(filtered); 
    	getNextMovie(); 
    	setIsFilterOpen(false);
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

            {/*C: Kode lagt til for filtrering (linje 112-174)*/}
            <button
                onClick={handleFilterToggle}
                type="button"
                className="fixed top-10 right-10 bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
                <img
                    src="https://cdn.jsdelivr.net/npm/heroicons@1.0.6/outline/filter.svg" 
                    alt="Filter"
                    className="w-4 h-4"
                />
            </button>

            {isFilterOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-grey bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 relative">
                        <button
                            onClick={handleFilterToggle}
                            type="button"
                            className="absolute top-2 right-2 bg-gray-300 text-sm px-2 py-1 rounded hover:bg-gray-400 transition"
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
                            <label htmlFor="yearInput" className="block text-sm font-semibold mb-1">Distribution Year:</label>
                            <input
                                id="yearInput"
                                type="number"
                                value={selectedYear}
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
            className="fixed bottom-32 right-10 flex justify-center items-center gap-1 text-white px-4 py-2 rounded-lg hover:opacity-80 transition cursor-pointer bg-positive w-[120px]"
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
            className="fixed bottom-32 left-10 flex justify-center items-center gap-1 text-white px-4 py-2 rounded-lg hover:opacity-80 transition cursor-pointer bg-negative w-[125px]"
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

