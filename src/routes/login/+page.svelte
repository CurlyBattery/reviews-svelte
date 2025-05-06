<script lang="ts">
    import {enhance} from '$app/forms';

    let { form } = $props();

    let email = $state('');
    let password = $state('');
</script>


<h1>Login</h1>

<form action="?/login" method="POST" use:enhance>
    <label>
        Email
        <input type="email" name="email" bind:value={email}>
    </label>
    <label>
        Password
        <input type="password" name="password" bind:value={password}>
    </label>

    {#if form?.invalid}
        <p class="error">Username and password is required</p>
    {/if}

    {#if form?.credentials}
        <p class="error">You have entered the wrong credentials</p>
    {/if}

    <button type="submit">Log in</button>
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

