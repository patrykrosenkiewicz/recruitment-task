import graphql from 'graphql';
import { MovieType } from '../types/MovieType.js';
import  Movie  from '../../models/movie.js';
import { dbClient } from '../../database/dbClient.js';

const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = graphql;

export const Mutation = new GraphQLObjectType({
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
