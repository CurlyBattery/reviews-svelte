<script lang="ts">
  import avatar from '$lib/assets/avatar.jpg';
  import {enhance} from '$app/forms';
  import Modal from '$lib/components/Modal.svelte';
  import {toast, Toaster} from "svelte-sonner";

  let showModal = $state(false);
  let uploadedImage: string = $state('');
  let upload = $derived(uploadedImage);
  let { data} = $props();

  let serverAvatar: string | undefined  = $state(data?.avatar);
  let array = serverAvatar !== undefined ? serverAvatar.split('/') : [];
  let isAvatar: boolean = array.length > 0 ? array?.[array.length -1] !== 'null' : false;

  let email = $state(data?.user ? data.user.email : '');
  let username = $state(data?.user ? data.user.username : '');

  async function formDeleteHandler(event) {
      event.preventDefault();

      try {
          const jwt = data?.cookieValue ?? '';
          console.log(jwt)

          const response = await fetch('http://localhost:3000/api/users/avatar', {
              method: 'DELETE',
              credentials: 'include',
              headers: {
                  "Content-Type": "application/json",
                  Cookie: `Authentication=${jwt}`
              },
          });

          if (!response) throw new Error('Failed to delete avatar');
          const res = await response.json();
          console.log(res)
      } catch (err) {
          console.error('Error deleting avatar:', err);
      }


  }
  function handleUploadImage(e: Event) {
      const image =(e.target as HTMLInputElement).files?.[0];
      if(!image) return;
      uploadedImage = URL.createObjectURL(image);
  }
  const addToast = () =>  {
      toast.success('Profile updated');
  };
  const addImageToast = () =>  {
      toast.success('Avatar changed');
  };
  const addDeleteImageToast = () =>  {
      toast.success('Avatar deleted');
  };
</script>
<Toaster />

<svelte:head>
    <title>Profile</title>
</svelte:head>


<div class="main">
    <div class="profile">
        <div class="head-info">
            <h3>Profile</h3>
            <span>Update your photo and personal details here.</span>
        </div>

        <p class="separator">
            <span></span>
        </p>

        <div class="settings">
            <div class="user-avatar-info">
                <img class="avatar" src={isAvatar ? serverAvatar : avatar} alt="User Avatar" />
                <div class="avatar-settings">
                    <h4>Profile Picture</h4>
                    <div class="avatar-edit-container">
                        <button class="upload-button" onclick={() => (showModal = true)}>Upload Image</button>
                        <Modal bind:showModal bind:uploadedImage>
                            {#snippet header()}
                                <h2>{data?.user ? data.user.username : 'Default username'}</h2>
                            {/snippet}

                            <form class="avatar-form" action="?/editPhoto" method="POST" enctype="multipart/form-data" use:enhance>
                                <div class="avatar-box">
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
                                <button onclick={() => { addImageToast(); showModal = false; }}  class="save" type="submit">Save</button>
                            </form>
                        </Modal>
                        <button onclick={(event) => {formDeleteHandler(event); addDeleteImageToast()}} type="submit" class="remove-button">Remove</button>
                    </div>
                    <span>We support PNGs, JPEGs under 10MB.</span>
                </div>
            </div>
            <form action="?/edit" method="POST" use:enhance>
                <div class="profile-box">
                    <label>Username</label>
                    <input name="username" bind:value={username} type="text" />
                </div>

                <div class="profile-box">
                    <label>Email</label>
                    <input name="email" bind:value={email} type="email" />
                </div>

                <div class="profile-edit-container">
                    <button class="save-button" onclick={addToast} type="submit">Save Changes</button>
                </div>
            </form>
        </div>
    </div>
</div>


<style>
    .main {
        font-family: 'Trebuchet MS', sans-serif;
        padding: 2em;
        height: 100%;
        width: 100%;
        color: #474747;
    }

    .profile {
        display: flex;
        flex-direction: column;
    }
    .head-info {
        display: flex;
        flex-direction: column;
        gap: 5px;
        margin-bottom: 20px;
    }
    .head-info h3 {
        font-size: 1.2em;
        font-weight: 600;
    }
    .head-info span {
        font-size: .8em;
        font-weight: 550;
        color: rgba(113, 113, 113, 0.8);
    }

    .separator {
        position: relative;
        margin-bottom: 20px;
    }
    .separator span {
        background: #ffffff;
        z-index: 1;
        position: relative;
    }
    .separator::after {
        content: '';
        position: absolute;
        width: 100%;
        top: 50%;
        left: 0;
        height: 2px;
        background: rgba(229, 229, 229, 0.5);
        display: block;
    }

    .settings {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 50%;
    }
    .user-avatar-info {
        display: flex;
        flex-direction: row;
        gap: 15px;
    }
    .user-avatar-info .avatar {
        width: 150px;
        max-height: 150px;
        border-radius: 25%;
        box-shadow: 0 5px 20px 0 rgba(0,0,0,0.4);
    }
    .avatar-settings {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .avatar-settings h4 {
        font-size: 1em;
        color: #363636;
    }
    .avatar-settings .avatar-edit-container {
        display: flex;
        flex-direction: row;
        gap: 15px;
        position: relative;
    }
    .avatar-form {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .avatar-box {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .input-file {
        position: relative;
        display: inline-block;
    }
    .input-file input {
        width: 100%;
        text-align: center;
        margin-top: 5px;
    }
    .input-file-btn {
        position: relative;
        display: inline-block;
        cursor: pointer;
        outline: none;
        text-decoration: none;
        font-size: 14px;
        vertical-align: middle;
        text-align: center;
        border-radius: 4px;
        background-color: #419152;
        line-height: 22px;
        height: 40px;
        padding: 10px 20px;
        box-sizing: border-box;
        border: none;
        margin: 0;
        transition: background-color 0.2s;
    }
    .input-file input[type=file] {
        position: absolute;
        z-index: -1;
        opacity: 0;
        display: block;
        width: 0;
        height: 0;
    }
    .input-file input[type=file]:focus + .input-file-btn {
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, .25);
    }
    .input-file:hover .input-file-btn {
        background-color: #59be6e;
    }
    .input-file:active .input-file-btn {
        background-color: #2e703a;
    }
    .preview {
        min-width: 200px;
        min-height: 100px;
        border: 2px solid #ddd;
        margin: 15px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        color: #cccccc;
    }
    .preview img {
        width: 100%;
    }
    .avatar-form .save {
        padding: .5em 2em;
        border-radius: 10px;
        border: 2px solid #ce327c;
        background-color: white;
        color: #363636;
        font-weight: 500;
        font-size: 16px;
        cursor: pointer;
        transition: 0.2s linear;
    }
    .avatar-form .save:hover {
        -webkit-transform: rotateZ(-5deg);
        -ms-transform: rotateZ(-5deg);
        transform: rotateZ(-5deg);

    }
    .avatar-settings button {
        padding: 5px 7px;
        font-weight: 500;
    }
    .upload-button {
        background: #7C5BFA;
        font-size: 12px;
        border: 1.5px solid rgba(176, 176, 176, 0.41);
        border-radius: 5px;
        color: #f3f3f5;
        cursor: pointer;
    }
    .upload-button:hover {
        background: #f3f3f5;
        border: 1px solid #7C5BFA;
        color: #7C5BFA;
    }
    .remove-button {
        background: #ffffff;
        font-size: 12px;
        border: 1.5px solid rgba(176, 176, 176, 0.41);
        border-radius: 5px;
        font-weight: 500;
        cursor: pointer;
        transition: 0.3s ease;
    }
    .remove-button:hover {
        background: #f3f3f5;
        border: 1px solid #7C5BFA;
        color: #7C5BFA;
    }
    .avatar-settings span {
        font-size: .7em;
        color: rgba(82, 82, 82, 0.5);
        font-weight: 600;
    }
    form {
        font-size: 1em;
        display: flex;
        flex-direction: column;
    }
    .profile-box label {
        display: block;
        font-weight: 600;
        margin-bottom: 8px;
        font-size: 14px;
        color: #363636;
    }
    .profile-box input {
        width: 50%;
        min-width: 300px;
        height: 30px;
        border: 1.5px solid rgba(176, 176, 176, 0.6);
        border-radius: 10px;
        outline: none;
        font-size: 17px;
        padding: 0 10px;
        margin-bottom: 20px;
        transition: 0.2s ease;
    }
    .profile-box input:focus {
        border: 1px solid #ce327c;
    }
    .profile-edit-container .save-button {
        height: 34px;
        border-radius: 10px;
        padding: 5px 15px;
        border: none;
        outline: none;
        background: #7C5BFA;
        color: #f3f3f5;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        margin-bottom: 28px;
        transition: 0.3s ease;
    }
    .profile-edit-container .save-button:hover {
        background: #f3f3f5;
        border: 1px solid #7C5BFA;
        color: #7C5BFA;
    }
    .profile-edit-container .cancel-button {
        height: 34px;
        border-radius: 10px;
        padding: 5px 15px;
        border: none;
        outline: none;
        background: #ffffff;
        color: #363636;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        margin-bottom: 28px;
        transition: 0.3s ease;
    }
    .profile-edit-container .cancel-button:hover {
        background: #f3f3f5;
        border: 1px solid #7C5BFA;
        color: #7C5BFA;
    }
</style>
