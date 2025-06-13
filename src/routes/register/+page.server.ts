import type {Actions} from './$types';
import {fail, redirect} from "@sveltejs/kit";

export const load = async ({locals}) => {
    if(locals.user) {
        redirect(302, '/reviews');
    }
}

export const actions = {
    register: async ({request}) => {
        const form = await request.formData();
        const email = form.get('email');
        const username = form.get('username');
        const password = form.get('password');
        const repeatPassword = form.get('repeatPassword');
        const avatar = form.get('avatar');

        if(
            typeof email !== 'string' ||
            typeof password !== 'string' ||
            typeof username !== 'string' ||
            typeof repeatPassword !== 'string' ||
            typeof avatar !== 'string' ||
            !email ||
            !username ||
            !avatar ||
            !repeatPassword ||
            !password
        ) {
            return fail(400, {invalid: true})
        }

        const responseUser = await fetch(`http://localhost:3000/api/users?email=${email}`);
        const user = await responseUser.json();
        if(user.length > 0){
            return fail(400, {user: true})
        }

        const response = await fetch('http://localhost:3000/api/authentication/register', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                username,
                password,
                repeatPassword,
                avatar
            })
        });
        const res = await response.json();

        if(!res.error || !res.statusCode) {
            redirect(303, 'login');
        }
        else {
            return fail(res.statusCode, {password: true})
        }
    }
} satisfies Actions;
