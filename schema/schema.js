import graphql from 'graphql';
import { RootQuery as MovieRootQuery } from './Query/movie.js';
import { Mutation as MovieMutation } from './Mutation/movie.js';

const { GraphQLSchema} = graphql;

export const schema = new GraphQLSchema({
	query: MovieRootQuery,
	mutation: MovieMutation
});
