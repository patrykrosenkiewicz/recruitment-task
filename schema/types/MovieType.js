import graphql from 'graphql';
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID } = graphql;

export const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: ( ) => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        year: { type: GraphQLString },
        runtime: { type: GraphQLString },
        genres: { type: new GraphQLList(GraphQLString) },
        director: { type: GraphQLString },
        actors: { type: GraphQLString },
        plot: { type: GraphQLString },
        posterUrl: { type: GraphQLString }
    }),
});
