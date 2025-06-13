<script lang="ts">
    import { page } from '$app/state';
    import { enhance } from '$app/forms'


    let {children} = $props();
</script>

<svelte:head>
    <title>Svelte Reviews</title>
</svelte:head>

<nav>
    {#if !page.data.user}
        <ul>
            <li><a href="/register">Start Now</a></li>
            <li><a href="/login">Sign In</a></li>
        </ul>
    {/if}

    {#if page.data.user}
        <ul>
            {#if page.data.user.role === 'Admin'}
                <li><a href="/admin">Admin</a></li>
            {/if}
        </ul>
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
        font-family: 'Trebuchet MS', sans-serif;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        padding: 1.5em;
        background-color: #2e4d64;
        height: 30px;
        box-shadow: 0 5px 5px #ababab;
        column-gap: 10px;
        font-size: 1em;
    }
    ul{
        display: flex;
        flex-direction: row;
        column-gap: 20px;
        align-items: center;
    }
    li, a {
         list-style-type: none;
         color: #b9b9b9;
         text-decoration: none;
     }
    a:hover {
        color: #ffffff;
    }
    li:first-child a{
        display: inline-block;
        color: #ffffff;
        background: #363636;
        border: none;
        padding: 10px;
        border-radius: 5px;
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
        height: calc(100vh - 78px);
    }
</style>
