type FilmTest = { name: string; year: number; genre: string[]; info: string };

function getMovieByYear(
	specifiedYear: number,
	movies: FilmTest[],
): FilmTest | null {
	return movies.find((movie) => movie.year === specifiedYear) || null;
}

function getMovieByGenres(
	genres: string[],
	movies: FilmTest[],
): FilmTest | null {
	return (
		movies.find((movie) => movie.genre.some((g) => genres.includes(g))) || null
	);
}
