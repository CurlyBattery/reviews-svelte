import {redirect} from "@sveltejs/kit";

export const load = async ({cookies, locals}) => {
    console.log(locals)
    if(!locals.user) {
        redirect(303, '/')
    }
    const response = await fetch('http://localhost:3000/api/reviews/my', {
        method: 'GET',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
            'Cookie': cookies.get('Authentication') ?? '',
        },
    });
    const res = await response.json();
    console.log(res)
    return {
        myReviews: [
            {
                id: 2,
                name: '1234'
            }
        ]
    }
}

export const actions = {

}
