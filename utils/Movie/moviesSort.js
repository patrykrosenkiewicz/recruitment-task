import { intersection } from 'lodash-es';

export const sortMoviesByAmoutOfGenresMatch = (movies, genres)=> {
    // console.log('first not sorted', movies[0]);
    let sortedMovies = movies.sort((a,b) => {
        const intersectionA = intersection(a.genres, genres);
        const intersectionB = intersection(b.genres, genres);
        return intersectionB.length - intersectionA.length;
    });

    return sortedMovies
}
