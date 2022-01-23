import graphql from 'graphql';

import { MovieType } from '../types/MovieType.js';
import { MovieController } from '../../controllers/movie.js';
import { initDb } from '../../database/dbClient.js';

const dbClient = await initDb();
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
                
				return await MovieController.save(movieData);
			}
		},
		deleteMovie: {
			// only for testing purposes
			type: MovieType,
			args: {title: { type: GraphQLString }},
			async resolve(){
				const { movies } = dbClient.data;
				movies.pop();
				await dbClient.write();
			}
		}
	}
});
