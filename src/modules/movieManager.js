import OtherAPIManager from "./OtherAPIManager";
import { apiKey } from "./apiKeys";

export default Object.create(OtherAPIManager, {
  getGenres: {
    value: function() {
      return OtherAPIManager.getOne(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${
          apiKey.apiMovies
        }&language=en-US`
      );
    }
  },
  getMovie: {
    value: function(movieId) {
      return OtherAPIManager.getOne(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${
          apiKey.apiMovies
        }&language=en&append_to_response=images`
      );
    }
  },
  discoverMoviesByGenre: {
    value: function(genreString) {
      return OtherAPIManager.getOne(
        `https://api.themoviedb.org/3/discover/movie?api_key=${
          apiKey.apiMovies
        }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreString}`
      );
    }
  }
});
