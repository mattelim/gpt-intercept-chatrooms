<script>
  import { username, chatroom, chatroomsInfo } from '../stores.js';

  function joinChatroom(id){
    chatroom.set(id);
  }
</script>

<div class="flex justify-center items-center xs:p-6">
  <div class="w-[600px] flex justify-center flex-col gap-6 bg-gradient-to-tl from-pink-100 via-purple-100 to-indigo-100 p-6 xs:rounded-md shadow-md">
    <div class="w-full flex flex-col gap-3">
      <div class="flex flex-col gap-3">
        <span class="text-xl font-bold mb-3">Hi {$username}!</span>
        <div class="flex flex-col w-full gap-6">
          {#each chatroomsInfo as chatroomInfo}
            <div class="card w-full bg-base-100 shadow-xl">
              <div class="card-body flex p-6">
                <h2 class="card-title">Chatroom {chatroomInfo.cr_id}</h2>
                <p>
                  Moderator: {chatroomInfo.cr_displayname}
                  <img src={`dp-${chatroomInfo.cr_id}.png`} class="w-8 h-8 rounded-full inline-block ml-2" alt={`${chatroomInfo.cr_displayname} display picture`}/>
                </p>
                <div class="card-actions justify-center mt-3 xs:justify-end xs:mt-0">
                  <button class="btn btn-primary w-full xs:w-auto" on:click={() => joinChatroom(chatroomInfo.cr_id)}>
                    Join Chatroom {chatroomInfo.cr_id}
                  </button>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>