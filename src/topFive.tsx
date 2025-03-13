import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./database";
import { getUsersLikedMovies } from "./databaseAccess";
import type { Film } from "./movies";

type User = {
	friends: string[];
	username: string;
};
async function getUsersWithIds(uids: string[]): Promise<User[]> {
	const users: User[] = [];
	for (const uid of uids) {
		const user = (await getDoc(doc(db, "users", uid))).data();
		if (!user) {
			throw new Error("User with ID didn't exist.");
		}
		users.push((await getDoc(doc(db, "users", uid))).data() as User);
	}
	return users;
}
async function getMoviesWithIds(ids: string[]): Promise<Film[]> {
	const movies: Film[] = [];
	for (const id of ids) {
		const movie = (await getDoc(doc(db, "films", id))).data();
		if (!movie) {
			throw new Error("Movie with ID didn't exist.");
		}
		movies.push((await getDoc(doc(db, "films", id))).data() as Film);
	}
	return movies;
}
async function getCurrentUser(): Promise<User> {
	if (!auth.currentUser?.uid) {
		throw new Error("Cannot find current user.");
	}
	return (await getUsersWithIds([auth.currentUser.uid]))[0];
}
async function getCurrentUsersFriendsLikedMovies(): Promise<
	Record<string, number>
> {
	const friendUids = (await getCurrentUser()).friends;
	friendUids.push(auth.currentUser?.uid as string);
	const likedMoviesMap: Record<string, number> = {};
	for (const friendUid of friendUids) {
		for (const movie of await getUsersLikedMovies(friendUid)) {
			if (!Object.keys(likedMoviesMap).includes(movie.movieId)) {
				likedMoviesMap[movie.movieId] = 0;
			}
			likedMoviesMap[movie.movieId] += 1;
		}
	}
	return likedMoviesMap;
}
export async function getSortedLikedMoviesAmongFriends(): Promise<Film[]> {
	const likedMoviesMap = await getCurrentUsersFriendsLikedMovies();
	const movieIds = Object.keys(likedMoviesMap);
	const movies = await getMoviesWithIds(movieIds);
	movies.sort((a, b) => likedMoviesMap[a.movieId] - likedMoviesMap[b.movieId]);
	return movies;
}

// export function TopFive() {
//     const [topMoviesAmongFriends, setTopMoviesAmongFriends] = useState<Film[]>();
//     useEffect(() => {
//         updateTopMovies();
//     }, [])
//     const updateTopMovies = useCallback(() => {
//         (async () => {
//             const movies = await getSortedLikedMoviesAmongFriends();
//             setTopMoviesAmongFriends(movies.slice(0, 5));
//         })();
//     }, [topMoviesAmongFriends]);

//     return <>
//         <article className="h-1/2 w-full">
//             <h2>Top Five Movies Among Friends:</h2>
//             <div className="h-full flex justify-start overflow-scroll">
//                 {topMoviesAmongFriends === undefined || topMoviesAmongFriends.length === 0 ? <h1>No movies here...</h1> : topMoviesAmongFriends.map(movie => {
//                     return <figure className="relative h-full flex-none">
//                         <img className="h-full" src={movie.logoPath} alt={movie.name + " logo"} />
//                     </figure>;
//                 })}
//             </div>
//         </article>
//     </>;
// }
