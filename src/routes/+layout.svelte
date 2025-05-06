<script lang="ts">
    import { page } from '$app/state';
    import { enhance } from '$app/forms'

    console.log(page.data);
    let {children} = $props();
</script>

<svelte:head>
    <title>Svelte Reviews</title>
</svelte:head>

<nav>

    {#if !page.data.user}
        <ul>
            <li><a href="/login">LOGIN</a></li>
            <li><a href="/register">REGISTER</a></li>
        </ul>
    {/if}

    {#if page.data.user}
        <form action="/logout" method="POST" use:enhance>
            <button type="submit">Log out</button>
        </form>
    {/if}

</nav>

<main>
    {@render children?.()}
</main>

<style>
    nav{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 2em;
        background-color: #474747;
    }
    ul{
        display: flex;
        flex-direction: row;
        column-gap: 20px;
    }
    li, a {
        list-style-type: none;
        color: white;
        text-decoration: none;
    }
    * {
        margin: 0;
        padding: 0;
    }
</style>
