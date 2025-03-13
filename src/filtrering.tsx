type FilmTest = { name: string; year: number; genre: string[]; info: string };

export function getMovieByYear(
	specifiedYear: number,
	movies: FilmTest[],
): FilmTest | null {
	return movies.find((movie) => movie.year === specifiedYear) || null;
}

export function getMovieByGenres(
	genres: string[],
	movies: FilmTest[],
): FilmTest | null {
	return (
		movies.find((movie) => movie.genre.some((g) => genres.includes(g))) || null
	);
}
