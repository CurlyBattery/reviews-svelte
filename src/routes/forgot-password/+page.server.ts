import {redirect} from "@sveltejs/kit";
import type {Actions} from "@sveltejs/kit";

export const load = async ({locals}) => {
    if(locals.user) {
        redirect(302, '/');
    }
}

export const actions = {
    forgotPassword: async ({request}) => {
        const form = await request.formData();
        const email = form.get('email');

        const response = await fetch('http://localhost:3000/api/authentication/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email
            }),
        });

        const res = await response.json();
        console.log(res);

        if(res.message) {
            return {
                success: true,
            }
        }
        else{
            return {
                success: false,
            }
        }


    }
} satisfies Actions;
