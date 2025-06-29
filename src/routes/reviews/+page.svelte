<script lang="ts">
    import type {PageProps} from "./$types";
    import Tabs from '$lib/components/Tabs.svelte';
    import Tab1 from "$lib/components/Tab1.svelte";
    import Tab2 from "$lib/components/Tab2.svelte";
    import Tab3 from "$lib/components/Tab3.svelte";

    let {data}: PageProps = $props();

    let items = [
        {
            label: 'Игры',
            value: 1,
            component: Tab1,
            props: {
                reviews: data.gameData
            },
        },
        {
            label: 'Фильмы',
            value: 2,
            component: Tab2,
            props: {
                reviews: data.movieData
            },
        },
        {
            label: 'Книги',
            value: 3,
            component: Tab3,
            props: {
                reviews: data.bookData
            },
        }
    ]
</script>

<svelte:head>
    <title>Reviews</title>
</svelte:head>

<div class="container">
    <Tabs {items}/>
</div>

<style>
    .container {
        padding: 20px;
    }


</style>

