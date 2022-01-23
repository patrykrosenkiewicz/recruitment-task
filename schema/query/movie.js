import graphql from 'graphql';
import { MovieType } from '../types/MovieType.js';

import { MovieController } from '../../controllers/movie.js';

const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = graphql;

export const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		movie: {
			type: MovieType,
			args: { duration: { type: GraphQLInt }, genres: { type: new GraphQLList(GraphQLString) }, title: { type: GraphQLString}},
			resolve(parent, args){
				const duration = Object.prototype.hasOwnProperty.call(args, 'duration') ? args.duration : '';
				const genres = Object.prototype.hasOwnProperty.call(args, 'genres') ? args.genres : '';
				const title = Object.prototype.hasOwnProperty.call(args, 'title') ? args.title : '';

				return MovieController.getMovies(duration, genres, title);
			}
		}
	}
});
