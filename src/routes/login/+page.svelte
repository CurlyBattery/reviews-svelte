<script lang="ts">
    import {enhance} from '$app/forms';
    import { Toaster, toast } from 'svelte-sonner'

    let email = $state('');
    let password = $state('');

    const addToast = () =>  {
        toast.success('Login successful');
    };
</script>
<Toaster />

<svelte:head>
    <title>Login</title>
</svelte:head>

<div class="main-container">
    <div class="login-box">
        <h2>Sign In</h2>
        <form action="?/login" method="POST" use:enhance>
            <div class="login_option">
                <div class="option">
                    <a href="#">
                        <img alt="Google" src={'https://img.icons8.com/?size=100&id=JvOSspDsPpwP&format=png&color=000000'} />
                        <span>Google</span>
                    </a>
                </div>
                <div class="option">
                    <a href="#">
                        <img alt="Apple" src={'https://img.icons8.com/?size=100&id=30840&format=png&color=000000'} />
                        <span>Apple</span>
                    </a>
                </div>
            </div>

            <p class="separator">
                <span>or</span>
            </p>

            <div class="user-box">
                <label>Email</label>
                <input  name="email" bind:value={email} required="" type="text">
            </div>
            <div class="user-box">
                <div class="password_title">
                    <label>Password</label>
                    <a href="/forgot-password">Forgot Password?</a>
                </div>

                <input type="password" name="password" bind:value={password} required="">
            </div>

            <button on:click={addToast} type="submit">Log in</button>
        </form>
    </div>
    <div class="dont_account">
        Don't have an account yet? <a href="/register">Sign Up</a>
    </div>
</div>

<style>
    .main-container {
        padding: 2em;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        background: #581535FF;
        background: radial-gradient(circle, rgba(88, 21, 53, 0.64) 0%, rgba(255, 255, 255, 1) 35%);
    }
    .login-box {
        width: 50%;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        row-gap: 20px;
        max-width: 400px;
        border: 1px solid rgba(71, 71, 71, 0.3);
        padding: 2em;
        border-radius: 5px;
        margin-bottom: 8px;
    }
    h2  {
        font-size: 2.5em;
    }
    .login_option {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
    }
    .login_option .option {
        width: calc(100% / 2 - 12px);
    }
    .login_option .option a {
        height: 34px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 12px;
        background: #f3f3f5;
        border: 1px solid #dadaf2;
        border-radius: 5px;
        margin: 24px 0 14px 0;
        text-decoration: none;
        color: #171645;
        font-weight: 500;
        transition: 0.2s ease;
        padding: .5em;
    }
    .login_option .option a:hover {
        background: #ededf5;
        border-color: #ce327c;
    }
    .login_option .option a img{
        max-width: 25px;
    }
    p {
        text-align: center;
        font-weight: 500;
    }
    .separator {
        position: relative;
        margin-bottom: 24px;
    }
    .separator span {
        background: #ffffff;
        z-index: 1;
        padding: 0 10px;
        position: relative;
    }
    .separator::after {
        content: '';
        position: absolute;
        width: 100%;
        top: 50%;
        left: 0;
        height: 1px;
        background: #c2c2c2;
        display: block;
    }
    form {
        font-size: 1em;
        display: flex;
        flex-direction: column;
    }
    .user-box label {
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
    .user-box .password_title {
        display: flex;
        justify-content: space-between;
        text-align: center;
    }
    .user-box {
        position: relative;
    }
    a {
        text-decoration: none;
        color: #581535FF;
        font-weight: 500;
    }
    a:hover {
        text-decoration: underline;
    }
    button {
        width: 100%;
        height: 34px;
        border-radius: 5px;
        border: none;
        outline: none;
        background: #581535FF;
        color: #ffffff;
        font-size: 18px;
        font-weight: 500;
        cursor: pointer;
        margin-bottom: 28px;
        transition: 0.3s ease;
    }
    button:hover {
        background: #ffffff;
        border: 1px solid #581535FF;
        color: #581535FF;
    }

</style>


