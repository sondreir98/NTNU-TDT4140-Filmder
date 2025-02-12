type FilmTest = { name: string; year: number; genre: string[]; info: string };

function getMovieByGenre(genre: string, movies: FilmTest[]): FilmTest | null {
	return movies.find((movie) => movie.genre.some((g) => g === genre)) || null;
}

function randomMovie(
	_likedMovies: FilmTest[],
	notWatched: FilmTest[],
): FilmTest | null {
	const length = notWatched.length;
	const randomNum: number = Math.floor(Math.random() * length);
	return notWatched[randomNum];
}

function newMovie(
	likedMovies: FilmTest[],
	notWatched: FilmTest[],
): FilmTest | null {
	const genresLiked: { [key: string]: number } = {};
	for (const movie of likedMovies) {
		for (const g of movie.genre) {
			if (genresLiked[g] !== null) {
				genresLiked[g] += 1;
			} else {
				genresLiked[g] = 1;
			}
		}
	}

	let totGenres = 0; //teller totalt antall sjangre telt opp
	for (const value of Object.values(genresLiked)) {
		//brukes senere for total sannsynlighet?
		totGenres += value;
	}

	let largestKey = ""; //finner brukers mest sette sjanger
	for (const key of Object.keys(genresLiked)) {
		if (largestKey === "") {
			largestKey = key;
		} else if (genresLiked[key] > genresLiked[largestKey]) {
			largestKey = key;
		}
	}
	return getMovieByGenre(largestKey, notWatched);
}
