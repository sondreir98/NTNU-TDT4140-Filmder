function Profile() {
	return (
		<div className="relative min-h-screen bg-gray-100 p-4 flex flex-col items-center">
			<h1 className="absolute top-4 text-2xl font-bold">Profile Page</h1>

			<img
				src="https://images.desenio.com/zoom/18823_1.jpg"
				alt="Profile"
				className="w-40 h-40 rounded-full mt-16 border-4 border-gray-500"
			/>

			<p className="mt-4 text-lg font-semibold">Username</p>

			<p className="text-gray-600">email@example.com</p>

			<div className="flex flex-col gap-5 mt-18 item">
				<button
					type="button"
					className="px-8 py-4 bg-positive text-white rounded-lg hover:bg-green-600 transition"
				>
					Liked films
				</button>
				<button
					type="button"
					className="px-8 py-4 bg-negative text-white rounded-lg hover:bg-red-600 transition"
				>
					Disliked films
				</button>
			</div>
		</div>
	);
}

export default Profile;
