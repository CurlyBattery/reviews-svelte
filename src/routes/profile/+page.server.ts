import {fail, redirect} from "@sveltejs/kit";

export const load = async ({locals, cookies}) => {
    if(!locals.user) {
        redirect(303, '/login')
    }

    const responseAvatar =  await fetch(`http://localhost:3000/api/files/${locals.user.avatarId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
            'Cookie': cookies.get('Authentication') ?? '',
        },
    });
    return {
        avatar: responseAvatar.url
    }
}

export const actions = {
    editPhoto: async ({request, cookies}) => {
        const form = await request.formData();

        const responseAvatar = await fetch('http://localhost:3000/api/users/avatar', {
            method: 'POST',
            credentials: 'include',
            mode: 'no-cors',
            headers: {
                'Cookie': await cookies.get('Authentication') ?? '',
            },
            body: form
        });
        const res = await responseAvatar.json();

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
    remove: async ({request, cookies}) => {
        const responseAvatar = await fetch('http://localhost:3000/api/users/avatar', {
            method: 'DELETE',
            credentials: 'include',
            mode: 'no-cors',
            headers: {
                'Cookie': await cookies.get('Authentication') ?? '',
            },
        });
        const res = await responseAvatar.json();
        console.log(res)
        if(!res.error && !res.statusCode) {
            return {
                successRemove: true,
            }
        }
        else{
            return {
                successRemove: false,
            }
        }

    }
}
