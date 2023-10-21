<script>
  import { createEventDispatcher } from 'svelte';
  import { username } from '../stores.js';

  // export let isUsername;
  let checkedEmpty = false;
  const dispatch = createEventDispatcher();

  function usernameClick(){
    if ($username == "") {
      checkedEmpty = true;
      return
    }
    dispatch('submitUsername');
  }
</script>

<div class="flex justify-center items-center p-6">
  <div class="w-[600px] flex justify-center flex-col gap-6 bg-gradient-to-tl from-pink-100 via-purple-100 to-indigo-100 p-6 rounded-md shadow-md">
    <div class="w-full flex flex-col gap-3">
      <div class="flex flex-col gap-3">
        <span class="">Enter your user name</span>
        {#if checkedEmpty}
          <span class="text-xs text-red-500">User name cannot be empty!</span>
        {/if}
        <div class="flex w-full gap-3">
          <input bind:value={$username} class="p-3 rounded-md grow">
          <button class="btn btn-primary" on:click={usernameClick}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 stroke-2 stroke-white">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>            
          </button>
        </div>
      </div>
    </div>
  </div>
</div>