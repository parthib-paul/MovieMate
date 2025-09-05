const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    if (!response.ok) throw new Error("API error");
    const data = await response.json();
    return Array.isArray(data.results) ? data.results : [];
  } catch (e) {
    return [];
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    if (!response.ok) throw new Error("API error");
    const data = await response.json();
    return Array.isArray(data.results) ? data.results : [];
  } catch (e) {
    return [];
  }
};
