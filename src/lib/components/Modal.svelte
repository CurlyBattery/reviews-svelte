<script>
    let{showModal = $bindable(), header, children, uploadedImage = $bindable()} = $props();

    let dialog = $state();

    $effect(() => {
      if (showModal) dialog.showModal();
    })
</script>

<dialog
        bind:this={dialog}
        onclose={() => (showModal = false)}
        onclick={(e) => { if (e.target === dialog) {
          uploadedImage = '';
          dialog.close()
        }}}
>
    <div>
        {@render header?.()}

        {@render children?.()}

        <button onclick={() => {
              uploadedImage = ''
              dialog.close()}
          }
        >
            Cancel
        </button>


    </div>
</dialog>
<style>
    dialog {
        position: absolute;
        top: calc(50vh - (/* height */450px / 2));
        left: calc(50vw - (/* width */400px / 2));
        max-width: 32em;
        width: 400px;
        height: 450px;
        border-radius: 0.2em;
        border: none;
        padding: 0;
    }
    div {
        height: 100%;
        padding: 2em;
        color: #474747;
        font-family: 'Trebuchet MS', sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
    }
    button {
        padding: 9px 25px;
        border-radius: 10px;
        color: #f3f3f5;
        border: none;
        background: #ce325c;
        font-weight: 500;
        font-size: 16px;
        cursor: pointer;
        transition: 0.2s linear;
        margin-top: 10px;
    }
    button:hover {
        -webkit-transform: rotateZ(5deg);
        -ms-transform: rotateZ(5deg);
        transform: rotateZ(5deg);

    }
    dialog::backdrop {
        background: rgba(0, 0, 0, 0.3);
    }
    dialog > div {
        padding: 1em;
    }
    dialog[open] {
        animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    @keyframes zoom {
        from {
            transform: scale(0.95);
        }
        to {
            transform: scale(1);
        }
    }
    dialog[open]::backdrop {
        animation: fade 0.2s ease-out;
    }
    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    button {
        display: block;
    }
</style>