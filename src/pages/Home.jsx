import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

function MovieModal({ movie, onClose }) {
  if (!movie) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <img
          className="modal-poster"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="modal-info">
          <h2>{movie.title}</h2>
          <p>
            <strong>Release:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}
          </p>
          <p>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(Array.isArray(popularMovies) ? popularMovies : []);
      } catch (err) {
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(Array.isArray(searchResults) ? searchResults : []);
      setError(null);
    } catch (err) {
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <header className="home-header">
        <h1>🎬 Discover Movies</h1>
        <p>Browse trending movies or search for your favorites!</p>
      </header>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {loading && <div className="loading-spinner"></div>}
      {error && <div className="error-message">{error}</div>}
      {!loading && !error && Array.isArray(movies) && movies.length === 0 && (
        <div className="empty-message">
          No movies found. Try a different search!
        </div>
      )}
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard
            movie={movie}
            key={movie.id}
            onClick={() => setSelectedMovie(movie)}
          />
        ))}
      </div>
      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
}

export default Home;
