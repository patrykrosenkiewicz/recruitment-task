import request from 'supertest'
import mocha from "mocha"
const {describe, it} = mocha
import {expect} from "chai"

import {app} from '../index.js';

describe('Post Endpoints', () => {
    it('should get all movies with titles', async () => {
        const res = await request(app)
            .post('/graphql')
            .send({ query: '{ movies {title}}'})
        expect(res.statusCode).equal(200)
        expect(res.body.data.movies).deep.to.equal(moviesWithTitles)
    })

    it('should get all movies with runtime between duration -10 and duration +10', async () => {
        const duration = 190
        const res = await request(app)
            .post('/graphql')
            .send({ 
                query: '{ movies(duration: 190) {runtime}}',
            })
        expect(res.statusCode).equal(200)
        const movies = res.body.data.movies;
        expect(movies).to.satisfy(movies => movies.every(movie => (movie.runtime >= duration - 10) && (movie.runtime <= duration + 10)));
    })

    it('should get a random movie', async () => {
        const duration = 130
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
        const thirdRes = await request(app)
        .post('/graphql')
        .send({ 
            query: '{ movie {id, title, year, runtime, genres, director, actors, plot, posterUrl}}'
        })
        expect(res.statusCode).equal(200)
        const movie = res.body.data.movie;
        const secondMovie = secondRes.body.data.movie;
        const thirdMovie = thirdRes.body.data.movie;
        
        expect(movie).to.not.deep.equal(secondMovie).to.not.deep.equal(thirdMovie);
    })
})

const moviesWithTitles = [
    {"title": "Beetlejuice"},
    {"title": "The Cotton Club"},
    {"title": "The Shawshank Redemption"},
    {"title": "Crocodile Dundee"},
    {"title": "Valkyrie"},
    {"title": "Ratatouille"},
    {"title": "City of God"},
    {"title": "Memento"},
    {"title": "The Intouchables"},
    {"title": "Stardust"},
    {"title": "Apocalypto"},
    {"title": "Taxi Driver"},
    {"title": "No Country for Old Men"},
    {"title": "Planet 51"},
    {"title": "Looper"},
    {"title": "Corpse Bride"},
    {"title": "The Third Man"},
    {"title": "The Beach"},
    {"title": "Scarface"},
    {"title": "Sid and Nancy"},
    {"title": "Black Swan"},
    {"title": "Inception"},
    {"title": "The Deer Hunter"},
    {"title": "Chasing Amy"},
    {"title": "Django Unchained"},
    {"title": "The Silence of the Lambs"},
    {"title": "American Beauty"},
    {"title": "Snatch"},
    {"title": "Midnight Express"},
    {"title": "Pulp Fiction"},
    {"title": "Lock, Stock and Two Smoking Barrels"},
    {"title": "Lucky Number Slevin"},
    {"title": "Rear Window"},
    {"title": "Pan's Labyrinth"},
    {"title": "Shutter Island"},
    {"title": "Reservoir Dogs"},
    {"title": "The Shining"},
    {"title": "Midnight in Paris"},
    {"title": "Les Misérables"},
    {"title": "L.A. Confidential"},
    {"title": "Moneyball"},
    {"title": "The Hangover"},
    {"title": "The Great Beauty"},
    {"title": "Gran Torino"},
    {"title": "Mary and Max"},
    {"title": "Flight"},
    {"title": "One Flew Over the Cuckoo's Nest"},
    {"title": "Requiem for a Dream"},
    {"title": "The Truman Show"},
    {"title": "The Artist"},
    {"title": "Forrest Gump"},
    {"title": "The Hobbit: The Desolation of Smaug"},
    {"title": "Vicky Cristina Barcelona"},
    {"title": "Slumdog Millionaire"},
    {"title": "Lost in Translation"},
    {"title": "Match Point"},
    {"title": "Psycho"},
    {"title": "North by Northwest"},
    {"title": "Madagascar: Escape 2 Africa"},
    {"title": "Despicable Me 2"},
    {"title": "Downfall"},
    {"title": "Madagascar"},
    {"title": "Madagascar 3: Europe's Most Wanted"},
    {"title": "God Bless America"},
    {"title": "The Social Network"},
    {"title": "The Pianist"},
    {"title": "Alive"},
    {"title": "Casablanca"},
    {"title": "American Gangster"},
    {"title": "Catch Me If You Can"},
    {"title": "American History X"},
    {"title": "Casino"},
    {"title": "Pirates of the Caribbean: At World's End"},
    {"title": "Pirates of the Caribbean: On Stranger Tides"},
    {"title": "Crash"},
    {"title": "Pirates of the Caribbean: The Curse of the Black Pearl"},
    {"title": "The Lord of the Rings: The Return of the King"},
    {"title": "Oldboy"},
    {"title": "Chocolat"},
    {"title": "Casino Royale"},
    {"title": "WALL·E"},
    {"title": "The Wolf of Wall Street"},
    {"title": "Hellboy II: The Golden Army"},
    {"title": "Sunset Boulevard"},
    {"title": "I-See-You.Com"},
    {"title": "The Grand Budapest Hotel"},
    {"title": "The Hitchhiker's Guide to the Galaxy"},
    {"title": "Once Upon a Time in America"},
    {"title": "Oblivion"},
    {"title": "V for Vendetta"},
    {"title": "Gattaca"},
    {"title": "Silver Linings Playbook"},
    {"title": "Alice in Wonderland"},
    {"title": "Gandhi"},
    {"title": "Pacific Rim"},
    {"title": "Kiss Kiss Bang Bang"},
    {"title": "The Quiet American"},
    {"title": "Cloud Atlas"},
    {"title": "The Impossible"},
    {"title": "All Quiet on the Western Front"},
    {"title": "The English Patient"},
    {"title": "Dallas Buyers Club"},
    {"title": "Frida"},
    {"title": "Before Sunrise"},
    {"title": "The Rum Diary"},
    {"title": "The Last Samurai"},
    {"title": "Chinatown"},
    {"title": "Calvary"},
    {"title": "Before Sunset"},
    {"title": "Spirited Away"},
    {"title": "Indochine"},
    {"title": "Birdman or (The Unexpected Virtue of Ignorance)"},
    {"title": "Boyhood"},
    {"title": "12 Angry Men"},
    {"title": "The Imitation Game"},
    {"title": "Interstellar"},
    {"title": "Big Nothing"},
    {"title": "Das Boot"},
    {"title": "Shrek 2"},
    {"title": "Sin City"},
    {"title": "Nebraska"},
    {"title": "Shrek"},
    {"title": "Mr. & Mrs. Smith"},
    {"title": "Original Sin"},
    {"title": "Shrek Forever After"},
    {"title": "Before Midnight"},
    {"title": "Despicable Me"},
    {"title": "Troy"},
    {"title": "The Hobbit: An Unexpected Journey"},
    {"title": "The Great Gatsby"},
    {"title": "Ice Age"},
    {"title": "The Lord of the Rings: The Fellowship of the Ring"},
    {"title": "The Lord of the Rings: The Two Towers"},
    {"title": "Ex Machina"},
    {"title": "The Theory of Everything"},
    {"title": "Shogun"},
    {"title": "Spotlight"},
    {"title": "Vertigo"},
    {"title": "Whiplash"},
    {"title": "The Lives of Others"},
    {"title": "Hotel Rwanda"},
    {"title": "The Martian"},
    {"title": "To Kill a Mockingbird"},
    {"title": "The Hateful Eight"},
    {"title": "A Separation"},
    {"title": "The Big Short"}
]