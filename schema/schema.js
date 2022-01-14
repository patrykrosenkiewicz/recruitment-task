import graphql from 'graphql';
import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
import { random } from 'lodash-es';

const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLSchema, GraphQLInt } = graphql;

// ###################################
// TODO move that to separate file
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, '../data/db.json')
console.log(file);
const adapter = new JSONFile(file)
const db = new Low(adapter)

await db.read()
db.data = db.data || { movies: [], genres: [] }
const { movies } = db.data
// ###################################

const MovieType = new GraphQLObjectType({
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

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                const { movies } = db.data
                const randomMovie = movies[random(0, movies.length)];
                return randomMovie;
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            args: { duration: { type: GraphQLInt } },
            resolve(parent, args){
                const { movies } = db.data
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
