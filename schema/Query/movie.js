import graphql from 'graphql';
import { random } from 'lodash-es';
import { MovieType } from '../types/MovieType.js';
import  Movie  from '../../models/movie.js';
import { sortMoviesByAmoutOfGenresMatch } from '../../utils/Movie/moviesSort.js';

const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLSchema, GraphQLInt } = graphql;

export const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        movie: {
            type: MovieType,
            args: { duration: { type: GraphQLInt }, genres: { type: new GraphQLList(GraphQLString) }, title: { type: GraphQLString}},
            resolve(parent, args){
                if(args.hasOwnProperty('title') && args.title !== '' && !args.hasOwnProperty('duration') && !args.hasOwnProperty('genres')){
                    return Movie.findByTitle(args.title);
                }
                const duration = args.hasOwnProperty('duration') ? args.duration : '';
                
                const moviesBetweenDuration = Movie.getMoviesBetweenDuration(duration);
                const genres = args.hasOwnProperty('genres') ? args.genres : '';
                if(genres !== ''){
                    const moviesWithGenres = Movie.getMoviesWithGenres(genres, moviesBetweenDuration);
                    const sortedMoviesWithGenres = sortMoviesByAmoutOfGenresMatch(moviesWithGenres, genres);

                    return sortedMoviesWithGenres;
                } else {
                    return [moviesBetweenDuration[random(0, moviesBetweenDuration.length)]];
                }
                
            }
        }
    }
});
