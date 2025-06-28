<script lang="ts">
    import {enhance} from "$app/forms";
    import { Select } from "flowbite-svelte";
    import {toast, Toaster} from "svelte-sonner";

    let { data} = $props();

    let categories = [
        { value: "Book", name: "Книги" },
        { value: "Game", name: "Игры" },
        { value: "Movie", name: "Фильмы" },
    ];

    let title = $state('');
    let selectedCategory = $state('');
    let text = $state('');
    let uploadedImage: string = $state('');
    let upload = $derived(uploadedImage);

    function handleUploadImage(e: Event) {
        const image =(e.target as HTMLInputElement).files?.[0];
        if(!image) return;
        uploadedImage = URL.createObjectURL(image);
    }

    const addToast = () =>  {
        toast.success('Review created');
    };
</script>
<Toaster />

<svelte:head>
    <title>Create Review</title>
</svelte:head>

<div class="main">
    <div class="create-review-container">
        <div class="introduction-container">
            <div class="white-background-container">
                <h3>Правила</h3>
                <ul>
                    <li>Никаких матов</li>
                    <li>Никаких оскорблений</li>
                    <li>Официальное и грамотное письмо</li>
                </ul>
            </div>
        </div>
        <div class="form-container" style="
            --asphalt: #506982;
            --border: #c6c6c6;
            --border-focus: #9FB1C1;
            --brand-color: #1b3d4d;
        ">
            <form action="?/create" method="POST" enctype="multipart/form-data" use:enhance>
                <div class="form-group">
                    <h2 class="heading">Отзывы & Оценки</h2>
                    <div class="controls">
                        <input type="text" id="title" class="floatLabel" name="title" bind:value={title} placeholder=" " >
                        <label for="title">Заголовок</label>
                    </div>
                    <div class="controls">
                        <select id="category" bind:value={selectedCategory} name="category" required>
                            {#each categories as cat}
                                <option value={cat.value} disabled={cat.value === ''} selected={cat.value === ''}>{cat.name}</option>
                            {/each}
                        </select>
                        <label for="category" class:selected={selectedCategory !== ''}>Категория</label>
                    </div>
                    <div class="controls">
                        <textarea name="text" bind:value={text} class="floatLabel" id="text" placeholder=" " ></textarea>
                        <label for="text">Основная мысль</label>
                    </div>
                    <div class="grid">
                        <div class="controls">
                            <label for="fileUpload"></label>
                            <input id="fileUpload" type="file" name="file" accept="image/*" onchange={handleUploadImage} >
                        </div>
                        <button type="submit" value="Submit" class="col-1-4">Создать ревью</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<style>
    @font-face {
        font-family: 'New Yorker';
        src: url('$lib/fonts/NewYorker.woff2') format('woff2'),
        url('$lib/fonts/NewYorker.woff') format('woff');
        font-weight: 500;
        font-style: normal;
        font-display: swap;
    }


    .main {
        height: 100%;
        width: 100%;
        color: #474747;
    }
    .create-review-container {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        height: 100%;
    }
    .introduction-container {
        height: 100%;
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-image: url("$lib/assets/photographer.jpg");
        color: #16161c;
        font-family: myFirstFont, sans-serif;
        font-size: 20px;
        text-shadow: 4px 4px 4px #aaa;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
    .white-background-container {
        background: rgba(255, 255, 255, 0.4);
        border-radius: 20px;
        padding: 1em;
    }
    li {
        list-style-type: none;
    }
    .form-container {
        height: 100%;
        width: 50%;
        padding: 2em;
        font-family: 'Lato', 'sans-serif';
        text-align: center;
        font-weight: 400;
    }
    form {
        padding: 4em 10%;
    }
    .form-group {
        margin-bottom: 20px;
    }
    h2.heading {
        font-size: 18px;
        text-transform: uppercase;
        font-weight: 300;
        text-align: left;
        color: var(--asphalt);
        border-bottom: 1px solid var(--asphalt);
        padding-bottom: 3px;
        margin-bottom: 20px;
    }

    .controls{
        text-align: left;
        position: relative;
    }
    .controls input[type="text"],
    .controls textarea {
        padding: 12px;
        border: 1px solid var(--border);
        width: 100%;
        margin-bottom: 18px;
        color: #888;
        font-family: 'Lato', sans-serif;
        font-size: 16px;
        font-weight: 300;
        border-radius: 2px;
        transition: all 0.3s;
        cursor: pointer;
    }
    .controls input[type="text"]:focus,
    .controls input[type="text"]:hover,
    .controls textarea:focus,
    .controls textarea:hover{
        outline: none;
        border-color: var(--border-focus);
    }
    .controls input[type="text"]:focus,
    .controls textarea:focus {
        box-shadow: 0 0 5px rgba(159, 177, 193, 0.5);
    }
    label {
        position: absolute;
        left: 8px;
        top: 12px;
        width: 60%;
        color: #999;
        font-size: 16px;
        display: inline-block;
        padding: 4px 10px;
        font-weight: 400;
        background-color: rgba(255, 255,255, 0);
        transition: color 0.3s, top 0.3s, background-color 0.8s;
    }
    .controls input:focus + label,
    .controls input:not(:placeholder-shown) + label,
    .controls textarea:focus + label,
    .controls textarea:not(:placeholder-shown) + label {
        top: -11px;
        color: #555;
        background-color: rgba(255, 255, 255, 1);
        width: auto;
    }
    .controls select {
        margin-bottom: 20px;
    }
    select {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        width: 100%;
        padding: 12px;
        border: 1px solid var(--border, #c6c6c6);
        border-radius: 2px;
        font-family: 'Lato', sans-serif;
        font-size: 16px;
        font-weight: 300;
        color: #888;
        background-color: white;
        cursor: pointer;
        transition: border-color 0.3s, box-shadow 0.3s;
    }

    select:focus,
    select:hover {
        outline: none;
        border-color: var(--border-focus, #9FB1C1);
        box-shadow: 0 0 5px rgba(159, 177, 193, 0.5);
    }
    select:focus + label,
    label.selected {
        top: -11px;
        color: #555;
        background-color: rgba(255, 255, 255, 1);
        font-size: 13px;
        width: auto;
    }

    select {
        background-image:
                url("data:image/svg+xml;charset=US-ASCII,%3csvg fill='%23888' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right 12px center;
        background-size: 16px 16px;
    }

    textarea {
        resize: none;
        height: 200px;
    }

    button {
        cursor: pointer;
        background-color: var(--brand-color);
        border: none;
        padding: 12px 0;
        float: right;
        transition: background-color 0.3s ease;
        color: white;
        margin-top: 20px;
    }
    button:hover{
        background-color: rgba(27, 61, 77, 0.5);
    }
    input[type=file]::file-selector-button {
        border: 2px solid #6c5ce7;
        padding: .2em .4em;
        border-radius: .2em;
        background-color: #a29bfe;
        transition: 1s;
    }

    input[type=file]::file-selector-button:hover {
        background-color: #81ecec;
        border: 2px solid #00cec9;
    }
    .grid {
        display: flex;
        gap: 1em;
        background: white;
        flex-direction: column;
    }
    .grid::after {
        content: "";
        display: table;
        clear: both;
    }
    [class*="col-"] {
        float: left;
        padding-right: 20px;
    }

    .grid [class*="col-"]:last-of-type {
        padding-right: 0;
    }
    .col-1-4 {
        width: 25%;
    }
    @media (max-width: 768px) {
        .col-1-4 {
            width: 100%;
            padding-right: 0;
        }
    }
</style>
