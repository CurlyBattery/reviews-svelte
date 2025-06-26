import {redirect} from "@sveltejs/kit";

export const load = async ({locals}) => {
    if(locals.user) {
        console.log(locals)
        redirect(303, '/reviews')
    }
}
