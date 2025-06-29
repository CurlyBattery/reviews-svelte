import {redirect} from "@sveltejs/kit";

export const load = async ({cookies, locals}) => {
    if(!locals.user) {
        redirect(303, '/login')
    }

    let gameReviews = [];
    let movieReviews = [];
    let bookReviews = [];
    const jwt = cookies.get('Authentication');

    const responseGameReviews = await fetch('http://localhost:3000/api/reviews?category=Game', {
        method: 'GET',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
            Cookie: `Authentication=${jwt}`
        },
    });
    const responseMovieReviews = await fetch('http://localhost:3000/api/reviews?category=Movie', {
        method: 'GET',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
            Cookie: `Authentication=${jwt}`
        },
    });
    const responseBookReviews = await fetch('http://localhost:3000/api/reviews?category=Book', {
        method: 'GET',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
            Cookie: `Authentication=${jwt}`
        },
    });

    const resGame = await responseGameReviews.json();
    gameReviews = resGame;
    const resMovie = await responseMovieReviews.json();
    movieReviews = resMovie;
    const resBook = await responseBookReviews.json();
    bookReviews = resBook;

    return {
        gameData: gameReviews,
        movieData: movieReviews,
        bookData: bookReviews,
        cookieValue: jwt,
    }
}

export const actions = {

}
