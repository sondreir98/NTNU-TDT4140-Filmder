import {
	getAllMovies,
	getDislikedMovies,
	getLikedMovies,
} from "./DatabaseAccess";
import type { Film } from "./Movies";

export async function getNotDisplayedMovieByGenreAndYear(
	genre: string | null,
	year: number | null,
	isPopular: boolean = false,
): Promise<Film | null> {
	const genreList = genre === null ? [] : [genre];
	const moviesByGenreAndYear = await getAllMovies(genreList, year, isPopular);
	const likedMovies = await getLikedMovies();
	const dislikedMovies = await getDislikedMovies();
	for (const movie of moviesByGenreAndYear) {
		let isDisplayed = false;
		for (const likedMovie of likedMovies) {
			if (likedMovie.movieId === movie.movieId) {
				isDisplayed = true;
				break;
			}
		}
		for (const dislikedMovie of dislikedMovies) {
			if (dislikedMovie.movieId === movie.movieId) {
				isDisplayed = true;
				break;
			}
		}
		if (isDisplayed) {
			continue;
		}
		return movie;
	}
	return null;
}

export async function nextMovie(
	genres: string[],
	year: number | null,
	isPopular: boolean = false,
): Promise<Film | null> {
	const likedMovies = await getLikedMovies();
	const dislikedMovies = await getDislikedMovies();
	const genresPopularity: { [key: string]: number } = {};
	for (const genre of genres) {
		let numberOfLikedMovies = 0;
		let numberOfDislikedMovies = 0;
		for (const movie of likedMovies) {
			if (movie.genre.includes(genre)) {
				numberOfLikedMovies++;
			}
		}
		for (const movie of dislikedMovies) {
			if (movie.genre.includes(genre)) {
				numberOfDislikedMovies++;
			}
		}
		genresPopularity[genre] = numberOfLikedMovies - numberOfDislikedMovies;
	}
	const genreSortedByPopularity = genres.sort((a, b) => {
		return genresPopularity[b] - genresPopularity[a];
	});
	let newMovie = null;
	let i = 0;
	while (newMovie === null && i < genres.length) {
		newMovie = await getNotDisplayedMovieByGenreAndYear(
			genreSortedByPopularity[i],
			year,
			isPopular,
		);
		i++;
	}
	return newMovie;
}
