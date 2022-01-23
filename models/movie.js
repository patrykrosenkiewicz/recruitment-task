import { initDb } from '../database/dbClient.js';
import  Joi  from 'joi';
import { movieDataValidation } from './movieValidation.js';
import { uniqWith, sortBy, isEqual } from 'lodash-es';


export const Movie = function (data) {
	Joi.attempt(data, movieDataValidation);
	this.data = data;
};

Movie.prototype.data = {};

const dbClient = await initDb();
Movie.findByTitle = (title, moviesArr = []) => {
	let { movies } = dbClient.data;
	movies = moviesArr.length > 0 ? moviesArr : movies;

	return uniqWith(movies.filter(movie => movie.title === title), isEqual);
};

Movie.getMoviesBetweenDuration = (duration, moviesArr = []) => {
	let { movies } = dbClient.data;
	movies = moviesArr.length > 0 ? moviesArr : movies;

	return duration == '' ? uniqWith(movies, isEqual) : uniqWith(movies.filter(movie => (movie.runtime >= duration - 10) && (movie.runtime <= duration + 10)), isEqual);
};

Movie.getMoviesWithGenres = (genres, moviesArr = []) => {
	let { movies } = dbClient.data;
	movies = moviesArr.length > 0 ? moviesArr : movies;

	return uniqWith(movies.filter(movie => movie.genres.some(genre => genres.includes(genre))), isEqual);
};

Movie.prototype.save = async function() {
	const { movies } = dbClient.data;
	const movieId = sortBy(movies, 'id')[movies.length -1].id + 1;
	this.data.id = movieId;
	movies.push(this.data);
	await dbClient.write();
	return this.data;
};
