import { redirect} from '@sveltejs/kit';
import * as setCookieParser from 'set-cookie-parser';

export const load = async ({locals}) => {
    if(!locals.user) {
        redirect(302, '/');
    }
};

export const actions = {
    default: async ({cookies})=> {


        const jwt = cookies.get('Authentication');

        const response = await fetch('http://localhost:3000/api/authentication/log-out', {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                Cookie: `Authentication=${jwt}`
            },
        });
        const res = await response.json();

        for(const str of setCookieParser.splitCookiesString(response.headers.get('set-cookie'))) {
            const {name, value, ...options} = setCookieParser.parseString(str);

            cookies.set(name, value, options);
        }
        redirect(302, '/');
    }
}
