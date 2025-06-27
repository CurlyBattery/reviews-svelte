<script lang="ts">
    import {enhance} from "$app/forms";
    import { Select } from "flowbite-svelte";

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
</script>

        <h2>Review</h2>
        <form action="?/create" method="POST" enctype="multipart/form-data" use:enhance>
            <div class="review-box">
                <label>Title</label>
                <input  name="title" bind:value={title} required="" type="text">
            </div>
            <div class="review-box">
                <label>Category</label>
                <Select name="category" items={categories} bind:value={selectedCategory} required=""/>
            </div>
            <div class="review-box">
                <label>Text</label>
                <textarea name="text" bind:value={text} cols="30" rows="10" ></textarea>
            </div>
            <div class="review">
                <label class="input-file">
                    <input type="file" name="file" accept="image/*" onchange={handleUploadImage} >
                    <span class="input-file-btn" style="color: white">Select File</span>
                </label>

                <div class="preview">
                    {#if upload}
                        <img src={uploadedImage} style="max-width: 50ch" alt="">
                    {:else}
                        <span>Avatar Preview</span>
                    {/if}
                </div>
            </div>

            <button type="submit">Create Review</button>
        </form>
