import {redirect} from "@sveltejs/kit";

export const load = async ({locals}) => {
    console.log(locals)
    if(!(locals.user.role === 'Admin')) {
        redirect(302, '/reviews')
    }
}
