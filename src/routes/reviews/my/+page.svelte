<script lang="ts">

    import type {PageProps} from "../$types";

    let {data}: PageProps = $props();
</script>

<h1>My Reviews</h1>
<div>
    {#each data?.myReviews as review}
        <div>
            {review.title}
        </div>
    {/each}
    <a href="/reviews/my/create">Create new +</a>
    <a href="/reviews">all</a>
</div>
