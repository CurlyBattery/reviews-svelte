<script lang="ts">

    let title = $state('');
    let selectedCategory = $state();
    let text = $state('');
    let preview = $state('');

</script>

        <h2>Review</h2>
        <form action="?/create" method="POST">
            <label>
                Title
                <input type="text" name="" bind:value={title} required>
            </label>
            <label>
                Category
                <select
                        bind:value={selectedCategory}
                        onchange={() => console.log(selectedCategory)}
                >
                    <option value={
                {
                    id: 1,
                    text: 'Book'
                }
            }>
                        Book
                    </option>
                    <option value={
                {
                    id: 2,
                    text: 'Game'
                }
            }>
                        Game
                    </option>
                    <option value={
                {
                    id: 3,
                    text: 'Movie'
                }
            }>
                        Movie
                    </option>
                </select>
            </label>
            <label>
                Text
                <textarea name="text" bind:value={text} cols="30" rows="10"></textarea>
            </label>
            <label>
                Preview
                <input type="text" name="" bind:value={preview} required>
            </label>
            <button type="submit">Create Review</button>
        </form>
