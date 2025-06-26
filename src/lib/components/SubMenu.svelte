<script>
    import avatar from "$lib/assets/avatar.jpg";
    import user from "$lib/assets/user.png";
    import send from "$lib/assets/send.png";
    import logout from "$lib/assets/logout.png";

    let {serverAvatar = $bindable()} = $props();
</script>
<div class="sub-menu-wrap" id="subMenu" data-sveltekit-reload>
    <div class="sub-menu">
        <div class="user-info">
            <img src={serverAvatar ? serverAvatar : avatar} alt="">
            <h3>Artem Kosyrev</h3>
        </div>

        <a href="/profile" class="sub-menu-link">
            <img src={user} alt="">
            <p>Edit Profile</p>
            <span>></span>
        </a>
        <a href="/info" class="sub-menu-link">
            <img src={send} alt="">
            <p>Help & Contacts</p>
            <span>></span>
        </a>
        <div class="sub-menu-link">
            <img src={logout} alt="">
            <form method="POST" action="/logout">
                <button type="submit">Log Out</button>
            </form>
            <span>></span>
        </div>
    </div>
</div>

<style>
    .sub-menu-wrap {
        position: absolute;
        top: 8%;
        right: 2%;
        width: 320px;
        max-height: 400px;
        overflow: hidden;
        transition: max-height 0.5s;
        z-index: 2;
    }

    .sub-menu {
        background: #2e4d64;
        padding: 20px;
        margin: 10px;
        border-radius: 20px;
    }
    .user-info {
        display: flex;
        align-items: center;
        padding: 10px 0;
        border-radius: 15px;
        justify-content: center;
        color: #f3f3f5;
    }
    .user-info h3 {
        font-weight: 500;
    }
    .user-info img {
        width: 50px;
        border-radius: 25%;
        margin-right: 15px;
    }
    .sub-menu-link {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: #f3f3f5;
        margin: 12px 0;
    }
    .sub-menu-link p {
        width: 100%;
    }
    .sub-menu-link form {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .sub-menu-link form button {
        background: none;
        width: 100%;
        border: none;
        color: #f3f3f5;
        text-decoration: none;
        font-size: 1em;
        text-align: left;
        transition: transform 0.5s;
    }
    .sub-menu-link:hover form button{
        font-weight: 600;
        color: rgba(243, 243, 245, 0.5);
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
        color: rgba(243, 243, 245, 0.5);
    }
    .sub-menu-link:hover p{
        font-weight: 600;
        color: rgba(243, 243, 245, 0.5);
    }
</style>