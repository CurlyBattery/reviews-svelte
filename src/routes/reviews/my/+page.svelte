<script lang="ts">

    import type {PageProps} from "../$types";
    import avatar from "$lib/assets/avatar.jpg";

    let {data}: PageProps = $props();

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
    const getTagClass = (category: string): string => {
        switch (category) {
            case 'Game':
                return 'tag-red';
            case 'Movie':
                return 'tag-blue';
            case 'Book':
                return 'tag-brown';
            default:
                return 'tag-default';
        }
    };

</script>

<svelte:head>
    <title>My Reviews</title>
</svelte:head>

    {#if data?.myReviews.length !== 0}
        <div class="main-container">
            {#each data?.myReviews as review}
                <div class="review-card">
                    <div class="card-header">
                        <img alt="Preview Review" src={`http://localhost:3000/api/files/${review.previewId}`} />
                    </div>
                    <div class="card-body">
                        <span class="tag {getTagClass(review.category)}">{makeCategory(review.category)}</span>
                        <h4>{review.title}</h4>
                        <p>{review.text}</p>
                        <div class="user">
                            <img alt="Avatar" src={handleImage(review)} />
                            <div class="user-info">
                                <h5>{review.userAndReviews[0].user.username}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            {/each}

        </div>

    {:else}
        <div class="not-reviews">
            <h2>Отзывов пока нет...</h2>
        </div>
    {/if}

<style>
    @import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

    .main-container {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        font-family: "Roboto", sans-serif;
        color: #10182f;
        max-width: 700px;
        padding: 10px;
        margin: 10px;
        border: 1px solid #dee2e6;
    }
    .not-reviews {
        display: flex;
        flex-direction: column;
        padding: 10px;
        margin: 10px;
        border: 1px solid #dee2e6;
    }
    .review-card {
        margin: 10px;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        width: 300px;
        height: auto;
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
    .tag-red {
        background-color: #e74c3c;
    }

    .tag-blue {
        background-color: #3498db;
    }

    .tag-brown {
        background-color: #8B4513;
    }

    .tag-default {
        background-color: #cccccc; /* По умолчанию */
    }


    .card-body p{
        font-size: 13px;
        margin: 0 0 40px;
    }
    .user {
        display: flex;
        margin-top: auto;
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

</style>

