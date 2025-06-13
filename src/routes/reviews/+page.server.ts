import {redirect} from "@sveltejs/kit";

export const load = async ({cookies, locals}) => {
    if(!locals.user) {
        redirect(303, '/')
    }
    const response = await fetch('http://localhost:3000/api/reviews?offset=0&limit=10', {
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
        reviews: [
            {
                id: 1,
                name: '123'
            }
        ]
    }
}

export const actions = {

}
