import request from 'supertest'
import mocha from "mocha"
const {describe, it} = mocha
import {expect} from "chai"

import {app} from '../index.js';

describe('Post Endpoints', () => {
    it('should get a random movie', async () => {
        const res = await request(app)
            .post('/graphql')
            .send({ 
                query: '{ movie {id, title, year, runtime, genres, director, actors, plot, posterUrl}}'
            })
        expect(res.statusCode).equal(200)
        const secondRes = await request(app)
            .post('/graphql')
            .send({ 
                query: '{ movie {id, title, year, runtime, genres, director, actors, plot, posterUrl}}'
            })
        expect(res.statusCode).equal(200)
        const movie = res.body.data.movie;
        const secondMovie = secondRes.body.data.movie;

        expect(movie).to.have.lengthOf(1);
        expect(secondMovie).to.have.lengthOf(1);

        expect(movie[0]).to.not.deep.equal(secondMovie[0]);
    })

    it('should get a random movie with runtime between duration', async () => {
        const duration = 130
        const res = await request(app)
            .post('/graphql')
            .send({ 
                query: `{ movie(duration: ${duration}) {id, title, year, runtime, genres, director, actors, plot, posterUrl}}`
            })
        expect(res.statusCode).equal(200)
        const secondRes = await request(app)
            .post('/graphql')
            .send({ 
                query: `{ movie(duration: ${duration}) {id, title, year, runtime, genres, director, actors, plot, posterUrl}}`
            })
        expect(res.statusCode).equal(200)

        const movie = res.body.data.movie;
        const secondMovie = secondRes.body.data.movie;
                
        expect(movie).to.have.lengthOf(1);
        expect(secondMovie).to.have.lengthOf(1);

        expect(movie[0]).to.not.deep.equal(secondMovie[0]);
    })

    it('should get all movies with genres', async () => {
        const requestedGenres = ["Comedy", "Animation", "Family"];
        const genresQuery = '["Comedy", "Animation", "Family"]';

        const res = await request(app)
            .post('/graphql')
            .send({ 
                query: `{ movie(genres: ${genresQuery}) {title, genres} }`
            })
        expect(res.statusCode).equal(200)

        const movies = res.body.data.movie;
        expect(movies).to.satisfy(movies => movies.every(movie => movie.genres.some(genre => requestedGenres.includes(genre))));
        const slicedMovies = movies.slice(0, 4);
        expect(slicedMovies).to.deep.equal(sortedMoviesByGenresWithTitles)
    })

    it('should get all movies with genres and between duration', async () => {
        const requestedGenres = ["Comedy", "Animation", "Family"];
        const genresQuery = '["Comedy", "Animation", "Family"]';
        const duration = 90;

        const res = await request(app)
            .post('/graphql')
            .send({ 
                query: `{ movie(duration: ${duration}, genres: ${genresQuery}) {title, genres, runtime} }`
            })
        expect(res.statusCode).equal(200)

        const movies = res.body.data.movie;
        expect(movies).to.satisfy(movies => movies.every(movie => movie.genres.some(genre => requestedGenres.includes(genre))));
        const slicedMovies = movies.slice(0, 4);
        expect(slicedMovies).to.deep.equal(sortedMoviesByGenresAndFilteredByDurationWithTitles)
    })

})


const sortedMoviesByGenresWithTitles = [
    {
        title: 'Ratatouille',
        genres: [ 'Animation', 'Comedy', 'Family' ]
    },
    {
        title: 'Planet 51',
        genres: [ 'Animation', 'Adventure', 'Comedy' ]
    },
    {
        title: 'Corpse Bride',
        genres: [ 'Animation', 'Drama', 'Family' ]
    },
    {
        title: 'Mary and Max',
        genres: [ 'Animation', 'Comedy', 'Drama' ]
    }
]

const sortedMoviesByGenresAndFilteredByDurationWithTitles = [
    {
        title: 'Planet 51',
        genres: [ 'Animation', 'Adventure', 'Comedy' ],
        runtime: '91',
    },
    {
        title: 'Mary and Max',
        genres: [ 'Animation', 'Comedy', 'Drama' ],
        runtime: '92',
    },
    {
        title: 'Despicable Me 2',
        genres: [ 'Animation', 'Adventure', 'Comedy' ],
        runtime: '98',
    },
    {
        title: 'Madagascar',
        genres: [ 'Animation', 'Adventure', 'Comedy' ],
        runtime: '86',
    }
]