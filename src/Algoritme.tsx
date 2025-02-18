import {
	getAllMovies,
	getDislikedMovies,
	getLikedMovies,
} from "./DatabaseAccess";
import type { FilmTest } from "./Movies";

export async function getNotDisplayedMovieByGenreAndYear(
	genre: string,
	year: number | null,
): Promise<FilmTest | null> {
	const moviesByGenreAndYear = await getAllMovies([genre], year);
	console.log("get", moviesByGenreAndYear, year);
	for (const movie of moviesByGenreAndYear) {
		const likedMovies = await getLikedMovies();
		const dislikedMovies = await getDislikedMovies();
		let isDisplayed = false;
		for (const likedMovie of likedMovies) {
			if (likedMovie.name == movie.name) {
				isDisplayed = true;
				break;
			}
		}
		for (const dislikedMovie of dislikedMovies) {
			if (dislikedMovie.name == movie.name) {
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
): Promise<FilmTest | null> {
	const likedMovies = await getLikedMovies();
	const dislikedMovies = await getDislikedMovies();
	const genresLiked: { [key: string]: number } = {};
	const genresDisliked: { [key: string]: number } = {};

	for (const genre of genres) {
		let numberOfLikedMovies = 0;
		let numberOfDislikedMovies = 0;
		for (const movie of likedMovies) {
			if (movie.genre.includes(genre)) {
				numberOfLikedMovies++;
			}
			for (const movie of dislikedMovies) {
				if (movie.genre.includes(genre)) {
					numberOfDislikedMovies++;
				}
			}
			genresLiked[genre] = numberOfLikedMovies;
			genresDisliked[genre] = numberOfDislikedMovies;
		}
	}
	let mostPopularGenre = "";
	for (const genre of genres) {
		if (
			mostPopularGenre == "" ||
			genresLiked[genre] - genresDisliked[genre] >
				genresLiked[mostPopularGenre] - genresDisliked[mostPopularGenre]
		) {
			mostPopularGenre = genre;
		}
	}
	console.log("gen", mostPopularGenre);

	return await getNotDisplayedMovieByGenreAndYear(mostPopularGenre, year);
}
