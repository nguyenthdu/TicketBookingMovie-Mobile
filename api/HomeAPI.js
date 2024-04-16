// api.js
const API_BASE_URL = "http://172.16.11.83:8080/api/movie";

export const fetchMoviesTrending = async () => {
  try {
    const response = await fetch("http://172.16.11.83:8080/api/movie/upcoming");
    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

export const fetchMoviesUpcoming = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/upcoming`);
    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
};

export const fetchMoviesShowing = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/upcoming`);
    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error("Error fetching showing movies:", error);
    throw error;
  }
};
