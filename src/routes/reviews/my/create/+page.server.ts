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
        const title = form.get('title');
        const category = form.get('selectedCategory');
        const text = form.get('text');
        const preview = form.get('preview');
        if(
            typeof title !== 'string' ||
            typeof category !== 'string' ||
            typeof text !== 'string' ||
            typeof preview !== 'string' ||
            !title ||
            !category ||
            !text ||
            !preview
        ) {
            return fail(400, {invalid: true})
        }


        const responseReview = await fetch(`http://localhost:3000/api/reviews`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                'Cookie': cookies.get('Authentication') ?? '',
            },
            body: JSON.stringify({
                title,
                category: category,
                text,
                preview,
            })
        });
        const res = await responseReview.json();

        if(!res.error || !res.statusCode) {
            redirect(303, '/reviews/my');
        }
        else {
            return fail(res.statusCode, {badRequest: true})
        }
    }
} satisfies Actions;
