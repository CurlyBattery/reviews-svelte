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


