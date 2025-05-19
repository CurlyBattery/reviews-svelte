import type {Actions} from './$types';
import {fail, redirect} from "@sveltejs/kit";
import * as setCookieParser from 'set-cookie-parser';

export const load = async ({locals}) => {
    if(locals.user) {
        redirect(302, '/');
    }
}

export const actions = {
    login: async ({request, cookies}) => {
        const form = await request.formData();
        const email = form.get('email');
        const password = form.get('password');

        if(
            typeof email !== 'string' ||
            typeof password !== 'string' ||
            !email ||
            !password
        ) {
            return fail(400, {invalid: true})
        }

        const responseUser = await fetch(`http://localhost:3000/api/users?email=${email}`);
        const user = await responseUser.json();
        if(!user){
            return fail(400, {credentials: true})
        }

        const response = await fetch('http://localhost:3000/api/authentication/log-in', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        const res = await response.json();
        console.log(res);

        for(const str of setCookieParser.splitCookiesString(response.headers.get('set-cookie'))) {
            const {name, value, ...options} = setCookieParser.parseString(str);

            cookies.set(name, value, options);
        }

        if(!res.error || !res.statusCode) {
            redirect(302, 'reviews');
        }
        else {
            return fail(res.statusCode, {credentials: true})
        }
    }
} satisfies Actions;
