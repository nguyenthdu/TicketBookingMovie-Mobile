import axios from "../utils/axios-custom";

export const fetchMoviesTrending = async () => {
  try {
    const response = await axios.get(`/api/movie?typeShow=Upcoming`);
    return response.data.content;
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

export const fetchMoviesUpcoming = async () => {
  try {
    const response = await axios.get(`/api/movie?typeShow=Upcoming`);
    return response.data.content;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
};

export const fetchMoviesShowing = async () => {
  try {
    const response = await axios.get(`/api/movie?typeShow=Showing`);
    return response.data.content;
  } catch (error) {
    console.error("Error fetching showing movies:", error);
    throw error;
  }
};
