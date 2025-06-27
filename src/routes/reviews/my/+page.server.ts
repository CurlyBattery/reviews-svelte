import {redirect} from "@sveltejs/kit";

export const load = async ({cookies, locals}) => {
    if(!locals.user) {
        redirect(303, '/')
    }
    let myReviews = [];
    const jwt = cookies.get('Authentication');

    const responseMyReviews = await fetch('http://localhost:3000/api/reviews/my', {
        method: 'GET',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
            Cookie: `Authentication=${jwt}`
        },
    });
    const res = await responseMyReviews.json();
    console.log(res)

    myReviews = res;

    return {
        myReviews,
    }
}

export const actions = {

}
