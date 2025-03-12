import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./Database";
import type { Friend } from "./Friends";

//kode utviklet med hjelp av KI
function UseFriends() {
	const [friends, setFriends] = useState<Friend[]>([]);
	const [loading, setLoading] = useState(true);
	const auth = getAuth();
	const currentUser = auth.currentUser;

	useEffect(() => {
		const fetchFriends = async () => {
			if (!currentUser) return;

			try {
				const userDocRef = doc(db, "users", currentUser.uid);
				const userDoc = await getDoc(userDocRef);

				if (userDoc.exists()) {
					const friendIds: string[] = userDoc.data().friends || [];
					console.log("Friend IDs:", friendIds);

					const friendDocs = await Promise.all(
						friendIds.map(async (id) => {
							const friendRef = doc(db, "users", id);
							const friendSnap = await getDoc(friendRef);

							if (!friendSnap.exists()) return null;

							const friendData = friendSnap.data();
							return {
								id,
								name: friendData.username,
								avatar: friendData.avatarPath,
							};
						}),
					);

					setFriends(
						friendDocs.filter((friend) => friend !== null) as Friend[],
					);
				}
			} catch (error) {
				console.error("Error fetching friends:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchFriends();
	}, [currentUser]);

	return { friends, loading };
}

export default UseFriends;
