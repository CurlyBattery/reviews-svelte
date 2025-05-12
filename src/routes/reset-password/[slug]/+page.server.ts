import {fail, redirect} from "@sveltejs/kit";

export const actions = {
    resetPassword: async ({request, params}) => {
        const form = await request.formData();
        const newPassword = form.get('password');
        const repeatPassword = form.get('repeatPassword');

        const response = await fetch(`http://localhost:3000/api/authentication/reset-password?token=${params.slug}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newPassword,
                repeatPassword,
            }),
        });
        const res= await response.json();
        if(res.username) {
            console.log(123);
            redirect(303, 'http://localhost:5173/login');
        }

    }
}
