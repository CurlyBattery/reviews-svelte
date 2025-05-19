<script lang="ts">
    import {enhance} from '$app/forms';
    import { Snackbar, Button } from 'svelte-mui';

    let { form } = $props();

    let email = $state('');
    let password = $state('');
    let message = $derived(form?.credentials
        ? 'You have entered the wrong credentials'
        : 'All fields is required');
    let visible = $derived(form?.invalid | form?.credentials);
</script>

<div class="main-container">
    <div class="login-box">
        <h2>Login</h2>
        <form action="?/login" method="POST" use:enhance>
            <div class="user-box">
                <input  name="email" bind:value={email} required="" type="text">
                <label>Email</label>
            </div>
            <div class="user-box">
                <input type="password" name="password" bind:value={password} required="">
                <label>Password</label>
            </div>

            <button type="submit">Log in</button>
<!--            <a href="/forgot-password">Забыли пароль?</a>-->
        </form>
    </div>
</div>

<Snackbar bind:visible bg="#f44336">
    {message}
    <span slot="action">
        <Button color="#fff" on:click={() => (visible = false)}>Close</Button>
    </span>
</Snackbar>

<style>
    .main-container {
        height: 100%;
    }
    .login-box {
        position: absolute;
        width: 400px;
        padding: 40px;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, .5);
        box-sizing: border-box;
        left: 50%;
        top: 50%;
        box-shadow: 0 15px 25px rgba(0, 0, 0, .6);
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
    input {
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
    label {
        position: absolute;
        top: 0;
        left: 0;
        padding: 10px 0;
        font-size: 16px;
        color: #fff;
        pointer-events: none;
        transition: .5s;
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
    input:focus ~ label,
    input:valid ~ label {
        top: -20px;
        left: 0;
        color: #03e9f4;
        font-size: 12px;
    }
</style>

