import type {PageLoad} from './$types';
import {error} from "@sveltejs/kit";

export const load: PageLoad = ({params}) => {
    if(params.slug) {
        return {
            token: params.slug
        };
    }

    error(404, 'Not Found');
}
