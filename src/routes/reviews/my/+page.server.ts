import {redirect} from "@sveltejs/kit";

export const load = async ({cookies, locals}) => {
    if(!locals.user) {
        redirect(303, '/')
    }
    const responseMyReviews = await fetch('http://localhost:3000/api/reviews/my', {
        method: 'GET',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
            'Cookie': cookies.get('Authentication') ?? '',
        },
    });
    const myReviews = await responseMyReviews.json();

    return {
        myReviews
    }
}

export const actions = {

}
