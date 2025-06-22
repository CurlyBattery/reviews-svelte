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
        // const avatarImage = form.get('avatarImage');
        if(
            typeof email !== 'string' ||
            typeof password !== 'string' ||
            typeof username !== 'string' ||
            typeof repeatPassword !== 'string' ||
            !email ||
            !username ||
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
            })
        });
        const res = await response.json();
        console.log(res);
        //
        // const avatarResponse = await fetch('http://localhost:3000/api/users/avatar', {
        //     method: 'POST',
        //     credentials: 'same-origin',
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //     },
        //     body: JSON.stringify({
        //         avatarImage,
        //     })
        // });
        // const avatarRes = await avatarResponse.json();
        // console.log(avatarRes);
        // console.log(!res.error && !res.statusCode && !res.error && !res.statusCode)

        if(!res.error && !res.statusCode) {
            redirect(303, 'login');
        }
        else {
            return fail(res.statusCode, {password: true})
        }
    }
} satisfies Actions;
