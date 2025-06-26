import {redirect} from "@sveltejs/kit";

export const load = async ({cookies, locals}) => {
    if(!locals.user) {
        redirect(303, '/login')
    }
    const responseReviews = await fetch('http://localhost:3000/api/reviews', {
        method: 'GET',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
            'Cookie': cookies.get('Authentication') ?? '',
        },
    });
    const response = await responseReviews.json();

    return {
        reviews: response
    }
}

export const actions = {

}
