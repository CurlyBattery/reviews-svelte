<script lang="ts">
    import type {PageProps} from "./$types";

    let {data}: PageProps = $props();
</script>

<h1>Reviews</h1>
<div>
    {#each data?.reviews as review}
        <div>
            {review.id}
        </div>
    {/each}
    <a href="/reviews/my">my</a>
</div>
