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
    console.log(message)

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
        padding: 2em;
    }
    .register-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
</style>
