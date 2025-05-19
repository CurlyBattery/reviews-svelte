<script lang="ts">
    import {enhance} from '$app/forms';
    import { Snackbar, Button } from 'svelte-mui';


    let {form} = $props();

    let email = $state('');
    let username = $state('');
    let password = $state('');
    let repeatPassword = $state('');
    let avatar = $state('');
    let message = $derived(form?.invalid
        ? 'All fields is required'
        : form?.user
            ? 'Username is taken'
            : repeatPassword !== "" && repeatPassword !== password
                ? 'Password not match'
                : 'Password too week'
    );
    let visible = $derived(form?.invalid | form?.user | (repeatPassword !== "" && repeatPassword !== password) |form?.password);

    let succesRegisterVisible = false;
    let succesRegisterMessage = 'Success registration. Please log in'
</script>

<div class="main-container">
    <div class="register-box">
        <h2>Register</h2>
        <form action="?/register" method="POST" use:enhance>
            <div class="user-box">
                <input  name="email" bind:value={email} required="" type="text">
                <label>Email</label>
            </div>
            <div class="user-box">
                <input type="text" name="username" bind:value={username} required="">
                <label>Username</label>
            </div>
            <div class="user-box">
                <input type="password" name="password" bind:value={password} required="">
                <label>Password</label>
            </div>
            <div class="user-box">
                <input type="password" name="repeatPassword" bind:value={repeatPassword} required="">
                <label>Repeat Password</label>
            </div>
            <div class="user-box">
                <input type="text" name="avatar" bind:value={avatar} required="">
                <label>Avatar</label>
            </div>

            <button type="submit" on:click={() => succesRegisterVisible = true}>Register</button>
        </form>
    </div>
</div>


<Snackbar bind:visible bg="#f44336">
    {message}
    <span slot="action">
        <Button color="#ff0" on:click={() => (visible = false)}>Close</Button>
    </span>
</Snackbar>

<Snackbar bind:succesRegisterVisible bg="#f44336">
    {succesRegisterMessage}
    <span slot="action">
        <Button color="#ff0" on:click={() => (visible = false)}>Close</Button>
    </span>
</Snackbar>

<style>
    .main-container {
        height: 100%;
    }

    .register-box {
        position: absolute;
        width: 400px;
        padding: 40px;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0,.5);
        box-sizing: border-box;
        left: 50%;
        top: 50%;
        box-shadow: 0 15px 25px rgba(0,0,0,.6);
        border-radius: 10px;
    }

    h2 {
        margin: 0 0 30px;
        padding: 0;
        color: #fff;
        text-align: center;
    }

    .user-box {
        position: relative;
    }
    button {
        border: none;
        padding: 10px 15px;
        border-radius: 10px;
        transition: all 0.2s;
    }

    button:hover {
        cursor: pointer;
    }

    button:active {
        transform: scale(0.95);
    }


    .user-box input {
        width: 100%;
        padding: 10px 0;
        font-size: 16px;
        color: #fff;
        margin-bottom: 30px;
        border: none;
        border-bottom: 1px solid #fff;
        outline: none;
        background: transparent;
    }
    .user-box label {
        position: absolute;
        top:0;
        left: 0;
        padding: 10px 0;
        font-size: 16px;
        color: #fff;
        pointer-events: none;
        transition: .5s;
    }

    .user-box input:focus ~ label,
    .user-box input:valid ~ label {
        top: -20px;
        left: 0;
        color: #03e9f4;
        font-size: 12px;
    }
</style>
