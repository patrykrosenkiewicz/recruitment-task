import graphql from 'graphql';
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLInt } = graphql;

export const MovieType = new GraphQLList(new GraphQLObjectType({
    name: 'Movie',
    fields: ( ) => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        year: { type: GraphQLInt },
        runtime: { type: GraphQLInt },
        genres: { type: new GraphQLList(GraphQLString) },
        director: { type: GraphQLString },
        actors: { type: GraphQLString },
        plot: { type: GraphQLString },
        posterUrl: { type: GraphQLString }
    }),
}));
