<script>
  import { username, chatroom, chatroomsInfo } from './stores.js';
  let isUsername = false;
  import Chatroom from "./lib/Chatroom.svelte";
  import Username from "./lib/Username.svelte";
  import Waitingroom from './lib/Waitingroom.svelte';

  function submitUsername(){
    isUsername = true;
  }
</script>

<main>
  {#if !isUsername}
    <Username on:submitUsername={submitUsername}/>
  {:else if !$chatroom}
    <Waitingroom />
  {:else}
    <Chatroom {...chatroomsInfo[$chatroom-1]}/>
  {/if}
</main>
