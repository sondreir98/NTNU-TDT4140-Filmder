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
    where,
} from "firebase/firestore";
import { auth, db } from "./Database";
import type { FilmTest } from "./Movies";

export async function getLikedMovies(): Promise<FilmTest[]> {
    if (auth.currentUser === null) {
        return [];
    }
    const allUserLikedRelations = await getDocs(
        query(
            collection(db, "userLikedFilms"),
            where("user", "==", auth.currentUser.uid),
        ),
    );
    const unpackedFilms: FilmTest[] = [];
    for (const relation of allUserLikedRelations.docs) {
        const filmId = relation.get("film");
        const film = await getDoc(doc(db, "films", filmId));
        if (!film.data()) {
            throw new Error("userLikedFilms has wrong formatted entries.");
        }
        unpackedFilms.push(film.data() as FilmTest);
    }
    return unpackedFilms;
}
export async function getDislikedMovies(): Promise<FilmTest[]> {
    if (auth.currentUser === null) {
        return [];
    }
    const allUserDislikedRelations = await getDocs(
        query(
            collection(db, "userDislikedFilms"),
            where("user", "==", auth.currentUser.uid),
        ),
    );
    const unpackedFilms: FilmTest[] = [];
    for (const relation of allUserDislikedRelations.docs) {
        const filmId = relation.get("film");
        const film = await getDoc(doc(db, "films", filmId));
        if (!film.data()) {
            throw new Error("userDislikedFilms has wrong formatted entries.");
        }
        unpackedFilms.push(film.data() as FilmTest);
    }
    return unpackedFilms;
}
export async function getAllMovies(
    genreFilter: string[] = [],
    yearFilter: number | null = null,
): Promise<FilmTest[]> {
    const rawMovies: FilmTest[] = [];
    const movieIds = new Set<string>();

    if (genreFilter.length === 0) {
        let querySnapshot: QuerySnapshot<DocumentData, DocumentData>;
        if (yearFilter === null) {
            querySnapshot = await getDocs(query(collection(db, "films")));
        } else {
            querySnapshot = await getDocs(query(collection(db, "films"), where("year", "==", yearFilter)));
        }
        for (const filmDocument of querySnapshot.docs) {
            const film = filmDocument.data() as FilmTest;
            if (!movieIds.has(filmDocument.id)) {
                movieIds.add(filmDocument.id);
                rawMovies.push(film);
            }
        }
    }

    for (const genre of genreFilter) {
        let querySnapshot: QuerySnapshot<DocumentData, DocumentData>;
        if (yearFilter === null) {
            querySnapshot = await getDocs(
                query(collection(db, "films"), where("genre", "array-contains", genre)),
            );
        } else {
            querySnapshot = await getDocs(
                query(
                    collection(db, "films"),
                    and(
                        where("year", "==", yearFilter),
                        where("genre", "array-contains", genre),
                    ),
                ),
            );
        }
        for (const filmDocument of querySnapshot.docs) {
            const film = filmDocument.data() as FilmTest;
            if (!movieIds.has(filmDocument.id)) {
                movieIds.add(filmDocument.id);
                rawMovies.push(film);
            }
        }
    }

    const filteredMovies = rawMovies.filter((film) => {
        const filmGenres = film.genre;
        return genreFilter.every((genre) => filmGenres.includes(genre));
    });

    return filteredMovies;
}
export async function likeMovie(movieId: string) {
    if (auth.currentUser === null) {
        throw new Error("You need to be logged in in order to like a movie.");
    }
    await addDoc(collection(db, "userLikedMovies"), {
        film: movieId,
        user: auth.currentUser.uid,
    });
}
export async function dislikeMovie(movieId: string) {
    if (auth.currentUser === null) {
        throw new Error("You need to be logged in in order to dislike a movie.");
    }
    await addDoc(collection(db, "userDislikedMovies"), {
        film: movieId,
        user: auth.currentUser.uid,
    });
}
