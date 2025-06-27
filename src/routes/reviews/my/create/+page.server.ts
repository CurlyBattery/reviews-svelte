import {fail, redirect} from "@sveltejs/kit";
import type {Actions} from "../../../../../.svelte-kit/types/src/routes/register/$types";

export const load = async ({ locals}) => {
    if (!locals.user) {
        redirect(303, '/')
    }
}

export const actions = {
    create: async ({request, cookies}) => {
        const form = await request.formData();

        const jwt = cookies.get('Authentication');

        const responseAvatar = await fetch('http://localhost:3000/api/reviews', {
            method: 'POST',
            credentials: 'include',
            headers: {
                Cookie: `Authentication=${jwt}`
            },
            body: form
        });
        const res = await responseAvatar.json();
        console.log(res);

        if(!res.error || !res.statusCode) {
            redirect(303, '/reviews/my');
        }
        else {
            return fail(res.statusCode, {badRequest: true})
        }

    },
} satisfies Actions;
