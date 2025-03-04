import {
	type DocumentData,
	type QuerySnapshot,
	addDoc,
	and,
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import { auth, db } from "./Database";
import type { Film } from "./Movies";

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
export async function getAllMovies(
	genreFilter: string[] = [],
	yearFilter: number | null = null,
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

	return rawMovies;
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

export async function addAvatar(filePath: string) {
	if (auth.currentUser === null) {
		throw new Error("You need to be logged in to set an avatar.");
	}

	const userId = auth.currentUser.uid;
	const avatarsRef = collection(db, "avatars");

	//henter avatar
	const existingAvatarQuery = query(avatarsRef, where("user", "==", userId));
	const existingAvatarSnapshot = await getDocs(existingAvatarQuery);

	if (!existingAvatarSnapshot.empty) {
		const avatarDoc = existingAvatarSnapshot.docs[0];
		await updateDoc(doc(db, "avatars", avatarDoc.id), { filePath });
	} else {
		await addDoc(avatarsRef, {
			user: userId,
			filePath: filePath,
		});
	}
}

export async function getAvatar(): Promise<string | null> {
	if (auth.currentUser === null) {
		return null;
	}

	const avatarQuery = query(
		collection(db, "avatars"),
		where("user", "==", auth.currentUser.uid)
	);

	const avatarSnapshot = await getDocs(avatarQuery);

	if (avatarSnapshot.empty){
		return null;
	}

	const avatarDoc = avatarSnapshot.docs[0]; //Fordi vi lagrer ting litt dårlig?
	return avatarDoc.get("avatarPath");

}
