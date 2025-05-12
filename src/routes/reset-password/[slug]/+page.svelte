<script lang="ts">
    import {enhance} from '$app/forms'

    let password = $state('');
    let repeatPassword = $state('');

</script>

<h1>Reset Password</h1>
<form action="?/resetPassword" method="POST" use:enhance>
    <label>
        Password
        <input type="password" name="password" bind:value={password}>
    </label>
    <label>
        Repeat Password
        <input type="password" name="repeatPassword" bind:value={repeatPassword}>
    </label>

    <button type="submit">Change Password</button>
</form>
