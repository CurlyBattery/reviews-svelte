
export const load = async ({locals, cookies}) => {
    if(locals.user) {
        const responseAvatar =  await fetch(`http://localhost:3000/api/files/${locals.user.avatarId}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return {
            user: locals.user,
            avatar: responseAvatar.url
        }
    }

}
