import { getLikedMovies } from "./DatabaseAccess";
import type { Film } from "./Movies";

async function getRandomMovie(): Promise<Film | null> {
	const likedMovies = await getLikedMovies();

	if (likedMovies.length === 0) {
		return null;
	}

	const randint = Math.floor(Math.random() * likedMovies.length);
	return likedMovies[randint];
}

export { getRandomMovie };
