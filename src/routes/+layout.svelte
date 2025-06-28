<script lang="ts">
    import { page } from '$app/state';
    import logo from '$lib/assets/favicon.png';
    import avatar from '$lib/assets/avatar.jpg';

    import SubMenu from "$lib/components/subMenu.svelte";
    import {toast} from "svelte-sonner";


    let {children, data} = $props();
    let user = data?.user;

    let serverAvatar: string | undefined  = $state(data?.avatar);
    let array = serverAvatar !== undefined ? serverAvatar.split('/') : [];
    let isAvatar: boolean = array.length > 0 ? array?.[array.length -1] !== 'null' : false;

    let isDropdownOpen = $state(false) // default state (dropdown close)

    const handleDropdownClick = () => {
        isDropdownOpen = !isDropdownOpen // togle state on click
    }

    const handleDropdownFocusLoss = ({ relatedTarget, currentTarget }) => {
        // use "focusout" event to ensure that we can close the dropdown when clicking outside or when we leave the dropdown with the "Tab" button
        if (relatedTarget instanceof HTMLElement && currentTarget.contains(relatedTarget)) return // check if the new focus target doesn't present in the dropdown tree (exclude ul\li padding area because relatedTarget, in this case, will be null)
        isDropdownOpen = false
    }

</script>

<svelte:head>
    <title>Svelte Reviews</title>
</svelte:head>

<div class="box" data-sveltekit-reload>
    <nav on:focusout={handleDropdownFocusLoss}>
        <a class="logo" href="/"><img alt="The project logo" src={logo} /></a>
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
                    <li><a href="/reviews">Reviews</a></li>
                    <li><a href="/reviews/my">My Reviews</a></li>
                    <li><a href="/reviews/my/create">New</a></li>
                {/if}
            </ul>
            <button class="profile-img" on:click={handleDropdownClick}><img class="user-pic" alt="The Profile Avatar" src={isAvatar ? serverAvatar : avatar}/></button>


            {#if isDropdownOpen}
                <SubMenu bind:serverAvatar bind:isAvatar bind:user/>
            {/if}
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
    nav ul{
        width: 100%;
        display: flex;
        flex-direction: row;
        column-gap: 20px;
        align-items: center;
        justify-content: right;
    }

    li, a {
         list-style-type: none;
         color: #b9b9b9;
         text-decoration: none;
        display: inline-block;
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
    .profile-img {
        background: none;
        border: none;
        padding: 0;
        margin: 0;
    }
    main {
        flex: 1 1 auto;
    }
    .logo img{
        width: 40px;
        height: auto;
    }
    .user-pic {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        margin-left: 30px;
    }
</style>
