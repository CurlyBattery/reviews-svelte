import {fail, redirect} from "@sveltejs/kit";

export const load = async ({locals, cookies}) => {
    if(!locals.user) {
        redirect(303, '/login')
    }
    const jwt = cookies.get('Authentication');

    const responseAvatar =  await fetch(`http://localhost:3000/api/files/${locals.user.avatarId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
            Cookie: `Authentication=${jwt}`

        },
    });
    return {
        avatar: responseAvatar.url,
        user: locals.user,
        cookieValue: jwt,
    }
}

export const actions = {
    editPhoto: async ({request, cookies}) => {
        const form = await request.formData();

        const jwt = cookies.get('Authentication');

        const responseAvatar = await fetch('http://localhost:3000/api/users/avatar', {
            method: 'POST',
            credentials: 'include',
            headers: {
                Cookie: `Authentication=${jwt}`
            },
            body: form
        });
        const res = await responseAvatar.json();
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

    },
    edit: async ({request, cookies, locals}) => {
        const form = await request.formData();
        const email = form.get('email');
        const username = form.get('username');

        const jwt = cookies.get('Authentication');

        const responseUser = await fetch(`http://localhost:3000/api/users/${locals.user.id}`,{
            method:  'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Cookie: `Authentication=${jwt}`
            },
            body: JSON.stringify({
                username: username ? username : locals.user.username,
                email: email ? email : locals.user.email,
            }),
        })
        const res = await responseUser.json();
        console.log(res)
            return {
                successUpdate: !res.error && !res.statusCode,
            }
    }
}
