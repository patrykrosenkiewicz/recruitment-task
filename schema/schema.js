import graphql from 'graphql';
import { random } from 'lodash-es';
import { dbClient } from '../database/dbClient.js';
import { MovieType } from './types/MovieType.js';
import { Api404Error } from '../utils/ErrorHandling/api404Error.js'

const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLSchema, GraphQLInt } = graphql;

await dbClient.read()
dbClient.data = dbClient.data || { movies: [], genres: [] }

const getMoviesBetweenDuration = (movies, duration) => {
    return duration == '' ? movies : movies.filter(movie => (movie.runtime >= duration - 10) && (movie.runtime <= duration + 10));
}

const getMoviesWithGenres = (movies, genres) => {
    return movies.filter(movie => movie.genres.some(genre => genres.includes(genre)));

}

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        movie: {
            type: MovieType,
            args: { duration: { type: GraphQLInt }, genres: { type: new GraphQLList(GraphQLString) } },
            resolve(parent, args){
                const { movies } = dbClient.data
                const duration = args.hasOwnProperty('duration') ? args.duration : '';
                
                const resultMovies = getMoviesBetweenDuration(movies, duration);
                const genres = args.hasOwnProperty('genres') ? args.genres : '';
                if(genres !== ''){

                    const moviesWithGenres = getMoviesWithGenres(movies, genres);
                    return moviesWithGenres;
                } else {
                    const randomMovie = [resultMovies[random(0, resultMovies.length)]];
                    return randomMovie;
                }
                
            }
        }
    }
});

export const schema = new GraphQLSchema({
    query: RootQuery
});
