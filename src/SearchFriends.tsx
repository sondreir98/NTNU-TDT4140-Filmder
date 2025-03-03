import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./Database";
import { AddFriendIcon, ArrowLeftIcon } from "./Icons";

const SearchFriends = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState<
		{ id: string; username: string }[]
	>([]);
	const [noResultsFound, setNoResultsFound] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const navigate = useNavigate();

	const addFriend = async (friendId: string) => {
		setSuccessMessage(null);
		setError(null);

		try {
			const auth = getAuth();
			const currentUser = auth.currentUser;

			if (!currentUser) {
				setError("You need to be logged in to add a friend.");
				return;
			}

			const currentUserId = currentUser.uid;
			if (currentUserId === friendId) {
				setError("You cannot add yourself as a friend.");
				return;
			}

			const currentUserRef = doc(db, "users", currentUserId);
			const friendUserRef = doc(db, "users", friendId);

			const currentUserDoc = await getDoc(currentUserRef);
			const friendUserDoc = await getDoc(friendUserRef);

			if (!currentUserDoc.exists() || !friendUserDoc.exists()) {
				setError("One of the users does not exist.");
				return;
			}

			const currentUserData = currentUserDoc.data();
			const friendData = friendUserDoc.data();
			const friendUsername = friendData?.username || "Unknown User";

			if (currentUserData?.friends?.includes(friendId)) {
				setError("Already added as your friend!");
				return;
			}

			await updateDoc(currentUserRef, {
				friends: arrayUnion(friendId),
			});

			await updateDoc(friendUserRef, {
				friends: arrayUnion(currentUserId),
			});

			setSuccessMessage(`You and ${friendUsername} are now friends!`);
		} catch (error) {
			setError("An error occurred while adding the friend.");
		}
	};

	const handleSearch = async () => {
		setSuccessMessage(null);
		setError(null);

		if (!searchQuery.trim()) return;

		try {
			const usersRef = collection(db, "users");
			const q = query(usersRef, where("username", "==", searchQuery.trim()));

			const querySnapshot = await getDocs(q);

			const results = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				username: doc.data().username,
			}));

			if (results.length === 0) {
				setNoResultsFound(true);
				setSearchResults([]);
			} else {
				setSearchResults(results);
				setNoResultsFound(false);
			}
		} catch (error) {
			setError("Error occurred while searching for users.");
		}
	};

	const handleGoToFriends = () => {
		navigate("/Friends");
	};

	return (
		<div className="flex flex-col mt-4 ml-4">
			<h2 className="text-2xl font-semibold mb-6 ml-2">Search for friends</h2>

			<div className="flex gap-2 mb-6">
				<input
					type="text"
					placeholder="Search by username..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="px-4 py-2 border border-gray-300 rounded-md text-lg w-64"
				/>
				<button
					onClick={handleSearch}
					type="button"
					className="px-4 py-2 bg-dark text-white rounded-md text-lg hover:bg-blue-600 transition"
				>
					Search
				</button>
			</div>

			{error && <div className="ml-2 text-primary font-semibold">{error}</div>}
			{successMessage && (
				<div className="ml-2 text-primary font-semibold">{successMessage}</div>
			)}

			<div className="flex flex-col w-64 mt-2 ml-2 space-y-2">
				{!noResultsFound ? (
					searchResults.map((user) => (
						<div key={user.id} className="flex items-center w-full">
							<span className="text-lg font-medium">{user.username}</span>
							<button
								onClick={() => addFriend(user.id)}
								type="button"
								className="ml-4 px-0.5 py-0.5 bg-positive text-white rounded-md text-sm hover:bg-green-700 transition"
							>
								<AddFriendIcon />
							</button>
						</div>
					))
				) : (
					<div className="text-lg font-medium text-gray-400">
						User not found
					</div>
				)}
			</div>

			<button
				onClick={handleGoToFriends}
				type="button"
				className="absolute bottom-6 left-6 px-4 py-2 bg-primary text-black rounded-md text-lg hover:bg-blue-400 transition"
			>
				<ArrowLeftIcon />
			</button>
		</div>
	);
};

export default SearchFriends;
