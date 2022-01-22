import { dbClient } from '../database/dbClient.js';
import  Joi  from 'joi';
import { movieDataValidation } from './movieValidation.js';

let Movie = function (data) {
    Joi.attempt(data, movieDataValidation);
    this.data = data;
}

Movie.prototype.data = {}

Movie.findByTitle = (title, moviesArr = []) => {
    let { movies } = dbClient.data;
    movies = moviesArr.length > 0 ? moviesArr : movies;

    return movies.filter(movie => movie.title === title);
}

Movie.getMoviesBetweenDuration = (duration, moviesArr = []) => {
    let { movies } = dbClient.data;
    movies = moviesArr.length > 0 ? moviesArr : movies;

    return duration == '' ? movies : movies.filter(movie => (movie.runtime >= duration - 10) && (movie.runtime <= duration + 10));
}

Movie.getMoviesWithGenres = (genres, moviesArr = []) => {
    let { movies } = dbClient.data;
    movies = moviesArr.length > 0 ? moviesArr : movies;

    return movies.filter(movie => movie.genres.some(genre => genres.includes(genre)));
}

Movie.prototype.save = async function() {
    const { movies } = dbClient.data;
    movies.push(this.data);
    await dbClient.write();
    return this.data;
}

export default Movie;
