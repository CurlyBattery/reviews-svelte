<script lang="ts">
    import {page} from '$app/state';
</script>

<h1>Admin</h1>

{#if page.data.user}
    <p>Welcome {page.data.user.name}!</p>
{/if}
