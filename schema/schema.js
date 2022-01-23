import graphql from 'graphql';
import { RootQuery as MovieRootQuery } from './query/movie.js';
import { Mutation as MovieMutation } from './mutation/movie.js';

const { GraphQLSchema} = graphql;

export const schema = new GraphQLSchema({
	query: MovieRootQuery,
	mutation: MovieMutation
});
