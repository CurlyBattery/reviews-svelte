import {redirect} from "@sveltejs/kit";

export const load = async ({cookies, locals}) => {
    if(!locals.user) {
        redirect(303, '/login')
    }

    let reviews = [];
    const jwt = cookies.get('Authentication');

    const responseReviews = await fetch('http://localhost:3000/api/reviews', {
        method: 'GET',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
            Cookie: `Authentication=${jwt}`

        },
    });

    const responseAvatar =  await fetch(`http://localhost:3000/api/files/${locals.user.avatarId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
            Cookie: `Authentication=${jwt}`

        },
    });
    const res = await responseReviews.json();
    reviews = res;

    return {
        myReviews: reviews,
        cookieValue: jwt,
    }
}

export const actions = {

}
