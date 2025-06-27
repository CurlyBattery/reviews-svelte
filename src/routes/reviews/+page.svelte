<script lang="ts">
    import type {PageProps} from "./$types";
    import logo from "$lib/assets/favicon.png";

    let {data}: PageProps = $props();

    async function handleImage( previewId: number) {

        try {
            const jwt = data?.cookieValue ?? '';

            const response = await fetch(`http://localhost:3000/api/files/${previewId}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    Cookie: `Authentication=${jwt}`
                },
            });

            if (!response) throw new Error('Failed to delete avatar');
            const res = await response.json();
            console.log(res)
            return res;
        } catch (err) {
            console.error('Error deleting avatar:', err);
        }
    }
</script>

<svelte:head>
    <title>Reviews</title>
</svelte:head>


<div class="main-container">
    {#each data?.myReviews as review}
        <div class="review-card">
            <div class="card-header">
                <img alt="Preview Review" src={`http://localhost:3000/api/files/${review.previewId}`} />
            </div>
            <div class="card-body">
                <span class="tag tag-teal">{review.category}</span>
                <h4>{review.title}</h4>
                <p>{review.text}</p>
                <div class="user">
                        <img alt="Preview Review" src={`http://localhost:3000/api/files/${review.userAndReviews[0].user.avatarId}`} />
                    <div class="user-info">
                        <h5>{review.userAndReviews[0].user.username}</h5>
                    </div>
                </div>
            </div>
        </div>
    {/each}
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
    .tag-teal {
        background-color: #47bcd4;
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

