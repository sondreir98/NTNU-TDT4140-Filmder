import { getLikedMovies } from "./databaseAccess";
import type { Film } from "./movies";

async function getRandomMovie(): Promise<Film | null> {
	const likedMovies = await getLikedMovies();

	if (likedMovies.length === 0) {
		return null;
	}

	const randint = Math.floor(Math.random() * likedMovies.length);
	return likedMovies[randint];
}

export { getRandomMovie };
