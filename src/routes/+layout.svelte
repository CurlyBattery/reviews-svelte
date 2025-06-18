<script lang="ts">
    import { page } from '$app/state';
    import { enhance } from '$app/forms'
    import logo from '$lib/assets/favicon.png';


    let {children} = $props();
</script>

<svelte:head>
    <title>Svelte Reviews</title>
</svelte:head>

<div class="box">
    <nav>
        <a href="/"><img alt="The project logo" src={logo} /></a>
        {#if !page.data.user}
            <ul>
                <li><a href="/register" class="register">Start Now</a></li>
                <li><a href="/login">Sign In</a></li>
            </ul>
        {/if}

        {#if page.data.user}
            <ul>
                {#if page.data.user.role === 'Admin'}
                    <li><a href="/admin">Admin</a></li>
                {:else}
                    <li><a href="/reviews/my">My Reviews</a></li>
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
</div>


<style>

    .box {
        display: flex;
        flex-flow: column;
        height: 100vh;
    }

    nav{
        flex: 0 1 auto;
        font-family: 'Trebuchet MS', sans-serif;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 30px;
        background-color: #2e4d64;
        height: var(--height-navbar);
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
    li:first-child .register{
        display: inline-block;
        color: #b9b9b9;
        background: #363636;
        padding: var(--padding-sign-up-button);
        border: 1px solid white;
        border-radius: 5px;
    }
    li:first-child .register:hover{
        background-color: #581535FF;
        color: white;
        border: 1px solid #474747;
    }
    * {
        margin: 0;
        padding: 0;
    }
    button {
        padding: .6em;
        font-size: var(--font-size-sign-up-button);
        border: 1px solid white;
        background-color: #474747;
        border-radius: 2px;
        color: white;
    }
    button:hover {
        background-color: #581535FF;
        border: 1px solid #474747;
    }
    main {
        flex: 1 1 auto;
    }
    img {
        width: 40px;
        height: auto;
    }
</style>
