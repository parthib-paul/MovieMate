import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import { useState } from "react";

function Favorites() {
  const { favorites } = useMovieContext();
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (favorites && favorites.length > 0) {
    return (
      <div className="favorites">
        <h2>Your Favorites</h2>
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} onClick={() => setSelectedMovie(movie)} />
          ))}
        </div>
        {selectedMovie && (
          <div className="modal-backdrop" onClick={() => setSelectedMovie(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedMovie(null)}>&times;</button>
              <img className="modal-poster" src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`} alt={selectedMovie.title} />
              <div className="modal-info">
                <h2>{selectedMovie.title}</h2>
                <p><strong>Release:</strong> {selectedMovie.release_date}</p>
                <p><strong>Rating:</strong> {selectedMovie.vote_average}</p>
                <p>{selectedMovie.overview}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="favorites-empty">
      <h2>No Favorite Movies Yet</h2>
      <p>Start adding movies to your favorites and they will appear here!</p>
    </div>
  );
}

export default Favorites;
