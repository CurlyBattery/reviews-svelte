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
            <li><a href="/login">Sign In</a></li>
            <li><a href="/register">Sign Up</a></li>
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
        justify-content: flex-end;
        align-items: center;
        padding: 1.5em;
        background-color: #474747;
        height: 30px;
        box-shadow: 0 5px 5px #ababab;
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
    button {
        padding: .6em;
        font-size: .9em;
        border: 1px solid white;
        background-color: #474747;
        border-radius: 2px;
        color: white;
    }
    button:hover {
        background-color: #f13535;
        border: none;
    }
    main {
        padding: 1em;
        height: calc(100vh - 110px);
    }
</style>
