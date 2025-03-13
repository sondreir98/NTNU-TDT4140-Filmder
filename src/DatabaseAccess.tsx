import {
	type DocumentData,
	type QuerySnapshot,
	addDoc,
	and,
	collection,
	doc,
	getCountFromServer,
	getDoc,
	getDocs,
	query,
	setDoc,
	where,
} from "firebase/firestore";
import { auth, db } from "./Database";
import type { Film, User } from "./Movies";

type FilmDatabaseResult = {
	name: string;
	year: number;
	genre: string[];
	info: string;
	logoPath: string;
};

function toMovieWithId(movieId: string, data: FilmDatabaseResult): Film {
	return {
		movieId: movieId,
		name: data.name,
		year: data.year,
		genre: data.genre,
		info: data.info,
		logoPath: data.logoPath,
	};
}

export async function getLikedMovies(): Promise<Film[]> {
	if (auth.currentUser === null) {
		return [];
	}
	const allUserLikedRelations = await getDocs(
		query(
			collection(db, "userLikedFilms"),
			where("user", "==", auth.currentUser.uid),
		),
	);
	const unpackedFilms: Film[] = [];
	for (const relation of allUserLikedRelations.docs) {
		const filmId = relation.get("film");
		const film = await getDoc(doc(db, "films", filmId));
		if (!film.data()) {
			throw new Error("userLikedFilms has wrong formatted entries.");
		}
		unpackedFilms.push(
			toMovieWithId(filmId, film.data() as FilmDatabaseResult),
		);
	}
	return unpackedFilms;
}
export async function getUsersLikedMovies(uid: string): Promise<Film[]> {
	const allUserLikedRelations = await getDocs(
		query(collection(db, "userLikedFilms"), where("user", "==", uid)),
	);
	const unpackedFilms: Film[] = [];
	for (const relation of allUserLikedRelations.docs) {
		const filmId = relation.get("film");
		const film = await getDoc(doc(db, "films", filmId));
		if (!film.data()) {
			throw new Error("userLikedFilms has wrong formatted entries.");
		}
		unpackedFilms.push(
			toMovieWithId(filmId, film.data() as FilmDatabaseResult),
		);
	}
	return unpackedFilms;
}

export async function getFriendsLikedMovies(friendId: string): Promise<Film[]> {
	// Query for the liked films of the given friend's UID
	const allUserLikedRelations = await getDocs(
		query(
			collection(db, "userLikedFilms"),
			where("user", "==", friendId), // Using the friendId here
		),
	);

	const unpackedFilms: Film[] = [];
	for (const relation of allUserLikedRelations.docs) {
		const filmId = relation.get("film");
		const film = await getDoc(doc(db, "films", filmId));
		if (!film.data()) {
			throw new Error("userLikedFilms has wrong formatted entries.");
		}
		unpackedFilms.push(
			toMovieWithId(filmId, film.data() as FilmDatabaseResult),
		);
	}
	return unpackedFilms;
}

export async function getDislikedMovies(): Promise<Film[]> {
	if (auth.currentUser === null) {
		return [];
	}
	const allUserDislikedRelations = await getDocs(
		query(
			collection(db, "userDislikedFilms"),
			where("user", "==", auth.currentUser.uid),
		),
	);
	const unpackedFilms: Film[] = [];
	for (const relation of allUserDislikedRelations.docs) {
		const filmId = relation.get("film");
		const film = await getDoc(doc(db, "films", filmId));
		if (!film.data()) {
			throw new Error("userDislikedFilms has wrong formatted entries.");
		}
		unpackedFilms.push(
			toMovieWithId(filmId, film.data() as FilmDatabaseResult),
		);
	}
	return unpackedFilms;
}
const POPULARITY_FRACTION = 1 / 20;

export async function getFriendsDislikedMovies(
	friendId: string,
): Promise<Film[]> {
	const allUserDislikedRelations = await getDocs(
		query(
			collection(db, "userDislikedFilms"),
			where("user", "==", friendId), // Using the friendId here
		),
	);

	const unpackedFilms: Film[] = [];
	for (const relation of allUserDislikedRelations.docs) {
		const filmId = relation.get("film");
		const film = await getDoc(doc(db, "films", filmId));
		if (!film.data()) {
			throw new Error("userDislikedFilms has wrong formatted entries.");
		}
		unpackedFilms.push(
			toMovieWithId(filmId, film.data() as FilmDatabaseResult),
		);
	}
	return unpackedFilms;
}

export async function getAllMovies(
	genreFilter: string[] = [],
	yearFilter: number | null = null,
	popularityFilter: boolean = false,
): Promise<Film[]> {
	const rawMovies: Film[] = [];
	const movieIds = new Set<string>();
	let querySnapshot: QuerySnapshot<DocumentData, DocumentData>;
	if (genreFilter.length === 0) {
		if (yearFilter === null) {
			querySnapshot = await getDocs(query(collection(db, "films")));
		} else {
			querySnapshot = await getDocs(
				query(collection(db, "films"), where("year", "==", yearFilter)),
			);
		}
	} else {
		if (yearFilter === null) {
			querySnapshot = await getDocs(
				query(
					collection(db, "films"),
					where("genre", "array-contains-any", genreFilter),
				),
			);
		} else {
			querySnapshot = await getDocs(
				query(
					collection(db, "films"),
					and(
						where("year", "==", yearFilter),
						where("genre", "array-contains-any", genreFilter),
					),
				),
			);
		}
	}
	for (const filmDocument of querySnapshot.docs) {
		if (!movieIds.has(filmDocument.id)) {
			movieIds.add(filmDocument.id);
			rawMovies.push(
				toMovieWithId(
					filmDocument.id,
					filmDocument.data() as FilmDatabaseResult,
				),
			);
		}
	}
	const popularMovies = [];
	if (popularityFilter) {
		const totalCount = (await getCountFromServer(query(collection(db, "userLikedFilms")))).data().count;
		for (const movie of rawMovies) {
			const coll = collection(db, "userLikedFilms");
			const q = query(coll, where("film", "==", movie.movieId));
			const aggregate = await getCountFromServer(q);
			const count = aggregate.data().count;
			if (count / totalCount >= POPULARITY_FRACTION) {
				popularMovies.push(movie);
			}
		}
		return popularMovies;
	} else {
		return rawMovies;
	}
}
export async function likeMovie(movieId: string) {
	if (auth.currentUser === null) {
		throw new Error("You need to be logged in in order to like a movie.");
	}
	await addDoc(collection(db, "userLikedFilms"), {
		film: movieId,
		user: auth.currentUser.uid,
	});
}
export async function dislikeMovie(movieId: string) {
	if (auth.currentUser === null) {
		throw new Error("You need to be logged in in order to dislike a movie.");
	}
	await addDoc(collection(db, "userDislikedFilms"), {
		film: movieId,
		user: auth.currentUser.uid,
	});
}

export async function setAvatar(avatarPath: string) {
	if (auth.currentUser === null) {
		throw new Error("You need to be logged in to set an avatar.");
	}

	const userId = auth.currentUser.uid;

	const userRef = (await getDoc(doc(db, "users", userId))).data() as User;
	userRef.avatarPath = avatarPath;

	await setDoc(doc(db, "users", userId), userRef);
}

export async function getUser(): Promise<User | null> {
	if (auth.currentUser === null) {
		return null;
	}

	const userId = auth.currentUser.uid;
	const userRef = (await getDoc(doc(db, "users", userId))).data() as User;

	return userRef;
}
//Start: Kode generert ved hjelp av kunstig intelligens
/**
 * @param movieId
 * @param category
 */
export const removeMovie = async (
	movieId: string,
	category: "liked" | "disliked",
) => {
	try {
		const user = auth.currentUser;
		if (!user) {
			throw new Error("User is not authenticated");
		}

		const collectionName =
			category === "liked" ? "userLikedFilms" : "userDislikedFilms";

		const q = query(
			collection(db, collectionName),
			where("user", "==", user.uid),
			where("film", "==", movieId),
		);

		const querySnapshot = await getDocs(q);

		if (!querySnapshot.empty) {
			for (const doc of querySnapshot.docs) {
				await deleteDoc(doc.ref);
			}

			console.log(
				`Successfully removed movie ${movieId} from ${collectionName}`,
			);
		} else {
			console.warn("No matching document found to delete.");
		}
	} catch (error) {
		console.error("Error removing movie:", error);
	}
};
//Slutt: Kode generert ved hjelp av kunstig intelligens

export async function getFriend(
	friendId: string,
): Promise<{ username: string; avatarPath: string } | null> {
	// Check if the user is authenticated
	if (auth.currentUser === null) {
		return null;
	}

	// Reference to the friend's user data in Firestore (using friendId)
	const friendRef = doc(db, "users", friendId);

	// Fetch the friend's data from Firestore
	const friendDoc = await getDoc(friendRef);

	// If the document exists, return the data in the expected structure
	if (friendDoc.exists()) {
		const friendData = friendDoc.data();
		// Return the necessary fields (username and avatarPath)
		return {
			username: friendData.username,
			avatarPath: friendData.avatarPath,
		};
	}
	// If no document exists for that friendId
	console.log("Friend not found");
	return null;
}
