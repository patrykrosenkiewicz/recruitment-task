import graphql from 'graphql';
import { random } from 'lodash-es';
import { dbClient } from '../database/dbClient.js';
import { MovieType } from './types/MovieType.js';
import { Api404Error } from '../utils/ErrorHandling/api404Error.js'

const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLSchema, GraphQLInt } = graphql;

await dbClient.read()
dbClient.data = dbClient.data || { movies: [], genres: [] }

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        movie: {
            type: MovieType,
            args: { duration: { type: GraphQLInt } },
            resolve(parent, args){
                const { movies } = dbClient.data
                const duration = args.hasOwnProperty('duration') ? args.duration : '';
                const resultMovies = duration == '' ? movies : movies.filter(movie => (movie.runtime >= duration - 10) && (movie.runtime <= duration + 10));

                const randomMovie = resultMovies[random(0, resultMovies.length)];
                return randomMovie;
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            args: { duration: { type: GraphQLInt } },
            resolve(parent, args){
                const { movies } = dbClient.data
                const duration = args.hasOwnProperty('duration') ? args.duration : '';
                const resultMovies = duration == '' ? movies : movies.filter(movie => (movie.runtime >= duration - 10) && (movie.runtime <= duration + 10));
                return resultMovies;
            }
        },
    }
});

export const schema = new GraphQLSchema({
    query: RootQuery
});
