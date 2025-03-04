import type { Film } from "./Movies";
import { nextMovie } from "./Algoritme";
import { useState } from "react";

type Friend = {
    id: number;
    name: string;
    avatar: string;
  };

  const friends: Friend[] = [
    { id: 1, name: "Alice Johnson", avatar: "https://i.pravatar.cc/100?u=alice" },
    { id: 2, name: "Bob Smith", avatar: "https://i.pravatar.cc/100?u=bob" },
    { id: 3, name: "Charlie Brown", avatar: "https://i.pravatar.cc/100?u=charlie" },
    { id: 4, name: "Bob Smith", avatar: "https://i.pravatar.cc/100?u=bob" },
    { id: 5, name: "Charlie Brown", avatar: "https://i.pravatar.cc/100?u=charlie" },
    { id: 6, name: "Bob Smith", avatar: "https://i.pravatar.cc/100?u=bob" },
    { id: 7, name: "Charlie Brown", avatar: "https://i.pravatar.cc/100?u=charlie" },
  ];

const movies: (Film|null)[] = [];

movies.push(await nextMovie(["drama"],null));
movies.push(await nextMovie(["action"],null));
movies.push(await nextMovie(["comedy"],null));
movies.push(await nextMovie(["romance"],null));
movies.push(await nextMovie(["sci-fi"],null));

function Friends() {
  const [selectedMovie, setSelectedMovie] = useState<Film | null>(null);
  const handleInfoToggle = (movie : Film) => {
		setSelectedMovie((prev) => (prev && prev.movieId === movie.movieId ? null : movie));

  
	};
  return (
      
      <div className="mb-6">
          <h2 className="text-2xl font-bold mb-1">Friend's Top Choices</h2>
          <div className="overflow-x-auto whitespace-nowrap">
              <div className="flex space-x-6">
                  {movies.map((movie) => (
                      movie ? (
                          <div key={movie.movieId} className="w-32 flex-shrink-0 relative m-0 p-0">
                            <button
                              onClick={() => handleInfoToggle(movie)}
                              type="button"
                              className="absolute top-[0px] left-[0px] text-white px-4 py-2 rounded-lg hover:opacity-40 transition cursor-pointer z-[0px]"
                            >
                              ℹ️
                            </button>
                            <img src={movie.logoPath} alt={movie.name} className="w-full h-40 object-cover rounded-lg" />
                            <p className="text-sm mt-1 text-center">{movie.name}</p>
                          </div>
                      ) : null
                  ))}
              </div>
          </div>

          {selectedMovie && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full"> 
            <h2 className="text-lg font-bold mb-4">{selectedMovie.name}</h2>
            <p className="text-center">{selectedMovie.info}</p>
            <button
              onClick={() => setSelectedMovie(null)}
              type = "button"
              className="mt-4 w-full bg-gray-200 hover:bg-gray-300 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

          <div className="p-4 bg-white rounded-lg">
              <h2 className="text-2xl font-bold mb-1">Friends</h2>
              <ul className="h-64 overflow-x-auto overflow-y-auto">
                  {friends.map((friend) => (
                      <li key={friend.id} className="flex items-center gap-4 p-2 border-b last:border-none">
                          <img src={friend.avatar} alt={friend.name} className="w-12 h-12 rounded-full" />
                          <span className="text-lg">{friend.name}</span>
                      </li>
                  ))}
              </ul>
          </div>
        </div>
        
  );
}

export default Friends;