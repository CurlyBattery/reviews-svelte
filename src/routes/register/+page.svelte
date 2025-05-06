<script lang="ts">
    import {enhance} from '$app/forms';
    let {form} = $props();

    let email = $state('');
    let username = $state('');
    let password = $state('');
    let repeatPassword = $state('');
    let avatar = $state('');
</script>

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
    {#if repeatPassword !== "" && repeatPassword !== password}
        <p class="error">Password not match</p>
    {/if}

    {#if form?.user}
        <p class="error">Username is taken</p>
    {/if}

    {#if form?.password}
        <p class="error">Password too week</p>
    {/if}

    <button type="submit">Register</button>
</form>

<style>
    form {
        display: flex;
        flex-direction: column;
        row-gap: 20px;
    }
    label {
        display: flex;
        flex-direction: column;
    }
    .error {
        color: red;
    }
</style>
