<script lang="ts">
    import {enhance} from '$app/forms';
    import {Button, Snackbar} from "svelte-mui";

    let email = $state('');

    let {form} = $props();

    let message = $derived(form?.success
        ? 'A letter has been sent to you'
        : 'Error sending');
    let visible = $derived(form?.success);
    let color = $derived(form?.success
        ? '#07a807'
        : '#f11212')

</script>

<div class="container">
    <div class="form-container">
        <h1>Forgot Password</h1>
        <form action="?/forgotPassword" method="POST" use:enhance>
            <label>
                Email
                <input type="email" name="email" bind:value={email}>
            </label>

            <button type="submit">Получить письмо</button>
            <span>* перейдите по ссылке в письме</span>
        </form>
    </div>
</div>

<Snackbar bind:visible bg={color}>
    {message}
    <span slot="action">
        <Button color="#fff" on:click={() => (visible = false)}>Close</Button>
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
        margin-top: 1em;
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
    span {
        color: white;
    }
</style>
