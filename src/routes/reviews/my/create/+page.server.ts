import {fail, redirect} from "@sveltejs/kit";
import type {Actions} from "../../../../../.svelte-kit/types/src/routes/register/$types";

export const load = async ({ locals}) => {
    if (!locals.user) {
        redirect(303, '/')
    }
}

export const actions = {
    create: async ({request}) => {
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
            return fail(400)
        }
    }
} satisfies Actions;
