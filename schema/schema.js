import graphql from 'graphql';
import { random, intersection } from 'lodash-es';
import { dbClient } from '../database/dbClient.js';
import { MovieType } from './types/MovieType.js';

const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLSchema, GraphQLInt } = graphql;

await dbClient.read()
dbClient.data = dbClient.data || { movies: [], genres: [] }

const getMoviesBetweenDuration = (movies, duration) => {
    return duration == '' ? movies : movies.filter(movie => (movie.runtime >= duration - 10) && (movie.runtime <= duration + 10));
}

const getMoviesWithGenres = (movies, genres) => {
    return movies.filter(movie => movie.genres.some(genre => genres.includes(genre)));
}

const sortMoviesByAmoutOfGenresMatch = (movies, genres)=> {
    // console.log('first not sorted', movies[0]);
    let sortedMovies = movies.sort((a,b) => {
        const intersectionA = intersection(a.genres, genres);
        const intersectionB = intersection(b.genres, genres);
        return intersectionB.length - intersectionA.length;
    });

    return sortedMovies
}


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        movie: {
            type: MovieType,
            args: { duration: { type: GraphQLInt }, genres: { type: new GraphQLList(GraphQLString) }, title: { type: GraphQLString}},
            resolve(parent, args){
                const { movies } = dbClient.data
                if(args.hasOwnProperty('title') && args.title !== ''){
                    return movies.filter(movie => movie.title === args.title);
                }
                const duration = args.hasOwnProperty('duration') ? args.duration : '';
                
                const resultMovies = getMoviesBetweenDuration(movies, duration);
                const genres = args.hasOwnProperty('genres') ? args.genres : '';
                if(genres !== ''){
                    const moviesWithGenres = sortMoviesByAmoutOfGenresMatch(getMoviesWithGenres(resultMovies, genres), genres);
                    return moviesWithGenres;
                } else {
                    const randomMovie = [resultMovies[random(0, resultMovies.length)]];
                    return randomMovie;
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
                // console.log(args)
                const { movies } = dbClient.data;
                const movieToAdd = {
                    title: args.title,
                    year: args.year,
                    duration: args.duration,
                    genres: args.genres,
                    director: args.director,
                    actors: args.actors,
                    plot: args.plot,
                    posterUrl: args.posterUrl,
                };
                movies.push(movieToAdd);
                await dbClient.write();
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
