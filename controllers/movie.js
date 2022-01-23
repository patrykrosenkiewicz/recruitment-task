import { random } from 'lodash-es';

import { Movie } from '../models/movie.js';
import { sortMoviesByAmoutOfGenresMatch } from '../utils/movie/moviesSort.js';

export const MovieController = function () {};

MovieController.getMovies = (duration = '', genres = '', title = '') => {            
	if(title !== '' && duration === '' && genres === ''){
		return Movie.findByTitle(title);
	}

	const moviesBetweenDuration = Movie.getMoviesBetweenDuration(duration);

	if(genres !== ''){
		const moviesWithGenres = Movie.getMoviesWithGenres(genres, moviesBetweenDuration);
		const sortedMoviesWithGenres = sortMoviesByAmoutOfGenresMatch(moviesWithGenres, genres);
    
		return sortedMoviesWithGenres;
	} else {
		return [moviesBetweenDuration[random(0, moviesBetweenDuration.length)]];
	}
};

MovieController.save = async (movieData) => {
	const addMovie = new Movie(movieData);
	return [await addMovie.save()];
};