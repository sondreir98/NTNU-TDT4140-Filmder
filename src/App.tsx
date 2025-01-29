import { useState } from "react";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<h1 className="text-xl">Filmder</h1>
			<button
				type="button"
				onClick={() => setCount((count) => count + 1)}
				className="text-base border"
			>
				count is {count}
			</button>
		</>
	);
}

export default App;
