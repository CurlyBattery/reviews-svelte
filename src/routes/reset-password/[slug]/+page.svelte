<script lang="ts">
    import {enhance} from '$app/forms'

    let password = $state('');
    let repeatPassword = $state('');

</script>

<div class="main-container">
    <div class="reset-box">
        <h2>Reset Password</h2>
        <form action="?/resetPassword" method="POST" use:enhance>
            <div class="user-box">
                <label>Password</label>
                <input type="password" name="password" bind:value={password}>
            </div>
            <div class="user-box">
                <label>Repeat Password</label>
                <input type="password" name="repeatPassword" bind:value={repeatPassword}>
            </div>

            <button type="submit">Change Password</button>
        </form>
    </div>
</div>

<style>
    .main-container {
        padding: 2em;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        background: #ffffff;
    }
    .reset-box {
        width: 50%;
        height: auto;
        display: flex;
        flex-direction: column;
        row-gap: 20px;
        max-width: 400px;
        border: none;
        padding: 2em;
    }
    h2 {
        font-size: 2.5em;
    }
    form {
        font-size: 1em;
        display: flex;
        flex-direction: column;
    }
    .user-box  label{
        display: block;
        font-weight: 500;
        margin-bottom: 8px;
    }
    .user-box input {
        width: 100%;
        height: 35px;
        border: 1px solid #474747;
        border-radius: 5px;
        outline: none;
        font-size: 17px;
        padding: 0 10px;
        margin-bottom: 20px;
        transition: 0.2s ease;
    }
    .user-box input:focus {
        border: 1px solid #ce327c;
    }
    .user-box {
        position: relative;
    }
    button {
        width: 100%;
        height: 34px;
        border-radius: 5px;
        border: none;
        outline: none;
        background: #581535FF;
        color: #ffffff;
        font-size: 17px;
        font-weight: 500;
        cursor: pointer;
        margin-bottom: 8px;
        transition: 0.3s ease;
    }
    button:hover {
        background: #ffffff;
        border: 1px solid #581535FF;
        color: #581535FF;
    }
</style>
