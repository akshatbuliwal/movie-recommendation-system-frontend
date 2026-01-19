import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [movie, setMovie] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");

  const handleRecommend = async () => {
    setError(""); // Clear previous errors
    setRecommendations([]); // Clear previous results

    if (!movie.trim()) {
      setError("Please enter a movie name.");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/recommend",
        { movie: movie.trim() }
      );

      if (response.data && response.data.recommended_movies) {
        setRecommendations(response.data.recommended_movies);
      } else {
        setError("Movie not found or no recommendations available.");
      }
    } catch (err) {
      console.error("❌ Axios error:", err);
      setError("Movie not found or server error.");
    }
  };

  return (
    <div className="App">
      <h1>🎬 Movie Recommendation System</h1>
      <input
        type="text"
        placeholder="Enter a movie name (e.g., Avatar)"
        value={movie}
        onChange={(e) => setMovie(e.target.value)}
      />
      <br />
      <button onClick={handleRecommend}>Recommend</button>
      <br />
      {error && <p style={{ color: "red" }}>{error}</p>}

      {recommendations.length > 0 && (
        <div>
          <h3>Recommended Movies:</h3>
          <ul>
            {recommendations.map((rec, idx) => (
              <li key={idx}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
