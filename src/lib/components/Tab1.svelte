<script lang="ts">
    let {reviews = $bindable(), cookie=$bindable(), user=$bindable()} = $props();
    let currentUserId = user?.id;

    import avatar from '$lib/assets/avatar.jpg';
    import like from '$lib/assets/like.png';
    import dislike from '$lib/assets/dislike.png';

    let isLiked = false;
    let isDisliked = false;

    function handleImage(review) {
        let serverAvatar: string | undefined  = $state(`http://localhost:3000/api/files/${review.userAndReviews[0].user.avatarId}`);
        let array = serverAvatar !== undefined ? serverAvatar.split('/') : [];
        let isAvatar: boolean = array.length > 0 ? array?.[array.length -1] !== 'null' : false;
        return isAvatar ? serverAvatar : avatar;
    }

    const makeCategory = (category: string) => {
        if(category === 'Game') {
            return 'Игры';
        } else if(category === 'Movie') {
            return 'Фильмы';
        } else if(category === 'Book') {
            return 'Книги';
        } else {
            return category;
        }
    }

    async function formLikeHandler(event: Event, reviewId: number) {
        event.preventDefault();
        try {
            isLiked = !isLiked;


            const jwt = cookie ?? '';

            const response = await fetch(`http://localhost:3000/api/reviews/${reviewId}/like?isActive=${isLiked}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    Cookie: `Authentication=${jwt}`
                },
            });

            if (!response) throw new Error('Failed to delete avatar');
            const res = await response.json();
        } catch (err) {
            console.error('Error deleting avatar:', err);
        }
    }
    async function formDislikeHandler(event: Event, reviewId: number) {
        event.preventDefault();
        try {
            isDisliked = !isDisliked;
            const jwt = cookie ?? '';

            const response = await fetch(`http://localhost:3000/api/reviews/${reviewId}/dislike?isActive=${isDisliked}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    Cookie: `Authentication=${jwt}`
                },
            });

            if (!response) throw new Error('Failed to delete avatar');
            const res = await response.json();
        } catch (err) {
            console.error('Error deleting avatar:', err);
        }
    }
</script>

<div class="main-container">
    {#if reviews.length !== 0}
        {#each reviews as review}
            <div class="review-card">
                <div class="card-header">
                    <img alt="Preview Review" src={`http://localhost:3000/api/files/${review.previewId}`} />
                </div>
                <div class="card-body">
                    <span class="tag tag-teal">{makeCategory(review.category)}</span>
                    <h4>{review.title}</h4>
                    <p>{review.text}</p>
                    <div class="user">
                        <img alt="Avatar" src={handleImage(review)} />
                        <div class="user-info">
                            <h5>{review.userAndReviews[0].user.username}</h5>
                        </div>
                    </div>
                    <div class="box">
                        <div class="icons">
                            <span class="like" id="likeCount" >{review._count.likes}</span>
                            <img src={like} alt="Like" id="likeBtn" onclick={(event) => {formLikeHandler(event, review.id)}}>
                        </div>
                        <div class="icons">
                            <img src={dislike} alt="Dislike" id="dislikeBtn" onclick={(event) => {formDislikeHandler(event, review.id)}}>
                            <span class="dislike" id="dislikeCount" >{review._count.dislikes}</span>
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    {:else}
        <div class="not-reviews">
            <h2>Отзывов пока нет...</h2>
        </div>
    {/if}
</div>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
    .main-container {
        display: flex;
        max-width: 700px ;
        justify-content: flex-start;
        flex-wrap: wrap;
        font-family: "Roboto", sans-serif;
        color: #10182f;
        margin: 0 100px;
    }
    .not-reviews {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .review-card {
        margin: 10px;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        width: 300px;
    }
    .card-header img {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }
    .card-body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding: 20px;
        min-height: auto;
    }
    .card-body p {
        min-height: 50px;
    }
    .tag {
        background: #cccccc;
        border-radius: 50px;
        font-size: 12px;
        margin: 0;
        color: #ffffff;
        padding: 2px 10px;
        text-transform: uppercase;
        cursor: pointer;
    }
    .tag-teal {
        background-color: #e74c3c;
    }

    .card-body p{
        font-size: 13px;
        margin: 0 0 40px;
    }
    .user {
        display: flex;
        margin-top: auto;
        margin-bottom: 15px;
    }
    .user img {
        border-radius: 50%;
        width: 40px;
        height: 40px;
        margin-right: 10px;
    }
    .user-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
    }
    .user-info h5{
        margin: 0;
    }

    .box {
        display: flex;
        width: 100%;
        justify-content: center;
    }
    .box .icons {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 8px;
        padding: 0 8px;
        cursor: pointer;
        border: 2px solid #2e4d64;
        border-radius: 50px;
        transition: 0.2s ease;
    }
    .box .icons:hover {
        background: rgba(80, 105, 130, 0.5);
    }

    .icons .like {
        width: 35px;
        border-right: 2px solid #2e4d64;
        padding: 0 10px 0 8px;
        pointer-events: none;
    }
    .icons .dislike {
        width: 35px;
        border-left: 2px solid #2e4d64;
        padding: 0 8px 0 10px;
        pointer-events: none;
    }
    .box .icons img {
        width: 20px;
        box-sizing: content-box;
        padding: 10px;
        transition: 0.2s ease;
        color: #fff;
        transform: scale(1);
    }
    .box .icons img:active {
        transform: scale(1.3);
    }
</style>
