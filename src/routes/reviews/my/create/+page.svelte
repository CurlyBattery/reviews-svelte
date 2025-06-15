<script lang="ts">
    import {Button, Snackbar} from "svelte-mui";
    import {enhance} from "$app/forms";
    import { Select } from "flowbite-svelte";

    let {form} = $props();

    let categories = [
        { value: "Book", name: "Книги" },
        { value: "Game", name: "Игры" },
        { value: "Movie", name: "Фильмы" },
    ];

    let title = $state('');
    let selectedCategory = $state('');
    let text = $state('');
    let preview = $state('');
    let message = $derived(
        form?.invalid
            ? 'All fields is required'
            : form?.review
                ? 'Review is taken'
                : 'Successful created'
    );
    let visible = $derived(form?.invalid | form?.review );


</script>

        <h2>Review</h2>
        <form action="?/create" method="POST" use:enhance>
            <div class="review-box">
                <label>Title</label>
                <input  name="title" bind:value={title} required="" type="text">
            </div>
            <div class="review-box">
                <label>Category</label>
                <Select name="selectedCategory" items={categories} bind:value={selectedCategory} required=""/>
            </div>
            <div class="review-box">
                <label>Text</label>
                <textarea name="text" bind:value={text} cols="30" rows="10" ></textarea>
            </div>
            <div class="review-box">
                <label>Preview</label>
                <input type="text" name="preview" bind:value={preview} required="">
            </div>

            <button type="submit">Create Review</button>
        </form>

<Snackbar bind:visible bg="#f44336">
    {message}
    <span slot="action">
        <Button color="#ff0" on:click={() => (visible = false)}>Close</Button>
    </span>
</Snackbar>
