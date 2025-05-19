import {type Handle} from "@sveltejs/kit";

export const handle: Handle = async ({event, resolve}) => {
    const accessToken = event.cookies.get('Authentication');
    if(!accessToken) {
        return resolve(event);
    }

    const authenticateUser = await fetch(`http://localhost:3000/api/authentication`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
            'Cookie': event.cookies.get('Authentication') ?? '',
        },
    });
    const user = await authenticateUser.json();
    if(user) {
        event.locals.user = {
            name: user.username,
            role: user.role
        }
    }

    return resolve(event);
};
