import graphql from 'graphql';
import { random, intersection } from 'lodash-es';
import { dbClient } from '../database/dbClient.js';
import { MovieType } from './types/MovieType.js';
import  Movie  from '../models/movie.js';
import { sortMoviesByAmoutOfGenresMatch } from '../utils/Movie/moviesSort.js';

const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLSchema, GraphQLInt } = graphql;

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        movie: {
            type: MovieType,
            args: { duration: { type: GraphQLInt }, genres: { type: new GraphQLList(GraphQLString) }, title: { type: GraphQLString}},
            resolve(parent, args){
                if(args.hasOwnProperty('title') && args.title !== ''){
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

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addMovie: {
            type: MovieType,
            args: {
                title: { type: GraphQLString },
                year: { type: GraphQLInt },
                duration: { type: GraphQLInt },
                genres: { type: new GraphQLList(GraphQLString) },
                director: { type: GraphQLString },
                actors: { type: GraphQLString },
                plot: { type: GraphQLString },
                posterUrl: { type: GraphQLString }
            },
            async resolve(parent, args){
                const movieData = {
                    title: args.title,
                    year: args.year,
                    runtime: args.duration,
                    genres: args.genres,
                    director: args.director,
                    actors: args.actors,
                    plot: args.plot,
                    posterUrl: args.posterUrl,
                };
                const addMovie = new Movie(movieData);
                return [await addMovie.save()];
            }
        },
        deleteMovie: {
            // only for testing purposes
            type: MovieType,
            args: {title: { type: GraphQLString }},
            async resolve(parent, args){
                const { movies } = dbClient.data;
                movies.pop();
                await dbClient.write();
            }
        }
    }
})

export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
