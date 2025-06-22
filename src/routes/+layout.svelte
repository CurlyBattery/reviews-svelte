<script lang="ts">
    import { page } from '$app/state';
    import logo from '$lib/assets/favicon.png';
    import SubMenu from "$lib/subMenu.svelte";
    import homeImage from "$lib/assets/home-image.png";
    import user from "$lib/assets/user.png";
    import send from "$lib/assets/send.png";
    import logout from "$lib/assets/logout.png";


    let {children} = $props();

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

<div class="box">
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
                    <li><a href="/reviews/my">My Reviews</a></li>
                {/if}
            </ul>
            <button class="profile-img" on:click={handleDropdownClick}><img class="user-pic" alt="The Profile Avatar" src={homeImage}/></button>


            {#if isDropdownOpen}
                <div class="sub-menu-wrap" id="subMenu" >
                    <div class="sub-menu">
                        <div class="user-info">
                            <img src={homeImage} alt="">
                            <h3>Artem Kosyrev</h3>
                        </div>

                        <hr>

                        <a href="#" class="sub-menu-link">
                            <img src={user} alt="">
                            <p>Edit Profile</p>
                            <span>></span>
                        </a>
                        <a href="#" class="sub-menu-link">
                            <img src={send} alt="">
                            <p>Help & Contacts</p>
                            <span>></span>
                        </a>
                        <a href="#" class="sub-menu-link">
                            <img src={logout} alt="">
                            <p>Log Out</p>
                            <span>></span>
                        </a>
                    </div>
                </div>
            {/if}

<!--            <form action="/logout" method="POST" use:enhance>-->
<!--                <button type="submit">Log out</button>-->
<!--            </form>-->
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
    /*button {*/
    /*    padding: .6em;*/
    /*    font-size: var(--font-size-sign-up-button);*/
    /*    border: 1px solid white;*/
    /*    background-color: #474747;*/
    /*    border-radius: 2px;*/
    /*    color: white;*/
    /*}*/
    /*button:hover {*/
    /*    background-color: #581535FF;*/
    /*    border: 1px solid #474747;*/
    /*}*/
    main {
        flex: 1 1 auto;
    }
    .logo img{
        width: 40px;
        height: auto;
    }
    .user-pic {
        width: 30px;
        border-radius: 50%;
        cursor: pointer;
        margin-left: 30px;
    }

    .sub-menu-wrap {
        position: absolute;
        top: 8%;
        right: 2%;
        width: 320px;
        max-height: 400px;
        overflow: hidden;
        transition: max-height 0.5s;
    }

    .sub-menu {
        background: #ccc;
        padding: 20px;
        margin: 10px;
        border-radius: 20px;
    }
    .user-info {
        display: flex;
        align-items: center;
    }
    .user-info h3 {
        font-weight: 500;
    }
    .user-info img {
        width: 40px;
        border-radius: 50%;
        margin-right: 15px;
    }
    .sub-menu hr {
        border: 0;
        height: 2px;
        width: 100%;
        background: white;
        margin: 15px 0 10px
    }
    .sub-menu-link {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: #525252;
        margin: 12px 0;
    }
    .sub-menu-link p {
        width: 100%;
    }
    .sub-menu-link img {
        width: 35px;
        background: #e5e5e5;
        border-radius: 35%;
        padding: 8px;
        margin-right: 15px;
    }
    .sub-menu-link span {
        font-size: 22px;
        transition: transform 0.5s;
    }
    .sub-menu-link:hover span{
        transform: translateX(5px);
        color: #525252;
    }
    .sub-menu-link:hover p{
        font-weight: 600;
        color: #525252;
    }

</style>
