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

<div class="container">
    <div class="form-container">
        <h1>Register</h1>
        <form action="?/register" method="POST" use:enhance>
            <label>
                Email
                <input type="email" name="email" bind:value={email}>
            </label>
            <label>
                Username
                <input type="text" name="username" bind:value={username}>
            </label>
            <label>
                Password
                <input type="password" name="password" bind:value={password}>
            </label>
            <label>
                Repeat Password
                <input type="password" name="repeatPassword" bind:value={repeatPassword}>
            </label>
            <label>
                Avatar
                <input type="text" name="avatar" bind:value={avatar}>
            </label>

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
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
    .form-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2em;
        background-color: rgba(128, 128, 128, 0.7);
        border-radius: 15px;
        box-shadow: 5px 5px 5px #ababab;
    }
    h1 {
        color: white;
        font-size: 20px;
        font-weight: bold;
    }

    form {
        display: flex;
        width: 300px;
        flex-direction: column;
        row-gap: 20px;
    }
    label {
        display: flex;
        flex-direction: column;
        font-size: 17px;
    }
    input  {
        height: 20px;
        border-radius: 10px;
        padding: 4px;
    }
    input:focus  {
        border: 1px solid #e1b43b;
    }
    button {
        height: 30px;
        border-radius: 10px;
        margin-top: 1.5em;
        background-color: rgba(154, 209, 229, 0.78);
        border: none;
        color: white;
    }
    button:hover {
        background-color: rgba(154, 209, 229, 0.63);
    }
    button:active {
        box-shadow: inset 5px 5px 5px 5px rgba(136, 136, 136, 0.67);
    }
</style>
