import axios from 'axios';

const API_KEY = '875bcfd7ec0b8d3190296541aa57dffe';

export const fetchPopularMovies = async () => {
  try {
    const response = await axios.get(

      'https://api.themoviedb.org/3/movie/popular',
      {
        params: {
          api_key: API_KEY,
          language: 'en-US',
          page: 2,
        },
      },
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movie data:', error);
    return [];
  }
};
