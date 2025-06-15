import {redirect} from "@sveltejs/kit";

export const load = async ({cookies, locals}) => {
    if(!locals.user) {
        redirect(303, '/')
    }
    const responseReviews = await fetch('http://localhost:3000/api/reviews?offset=0&limit=10', {
        method: 'GET',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
            'Cookie': cookies.get('Authentication') ?? '',
        },
    });
    const {data} = await responseReviews.json();
    console.log(data)

    return {
        reviews: data
    }
}

export const actions = {

}
