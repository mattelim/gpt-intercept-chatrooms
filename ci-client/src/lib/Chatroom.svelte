<script>
  import { io } from "socket.io-client";
  const socket = io();
  import { username, chatroom } from "../stores";
  import { afterUpdate } from "svelte";

  export let cr_id; 
  export let cr_moderator; 
  export let cr_displayname;

  let textVal = "";
  let chatDiv;
  let userid;
  
  let messageNum = 0;

  // Get user id from socket connection
  socket.on('connect', () => {
    // console.log(socket.id);
    userid = socket.id;
    socket.emit('userRoomInfo', JSON.stringify({chatroomid: cr_id, userid: userid}));
  });

  socket.on('preMessage', msg => {
    let msgObj = JSON.parse(msg);
    if (msgObj.userid == userid) return
    chatDiv.innerHTML += `<div class="mb-1 flex gap-2 items-start w-full relative p-2"><p class="text-xs flex-none w-8 overflow-clip bg-gray-100 rounded-full p-2 absolute bottom-0 left-0">${msgObj.username}</p><div id="${msgObj.userid}-${msgObj.messageNum}-text" class="w-full ml-8 break-words bg-gray-100 p-3 rounded-md rounded-bl-none relative">${msgObj.text}<div class="h-full w-full p-2 absolute left-0 top-0"><div class="h-full w-full backdrop-blur-sm"></div></div></div><div class="absolute right-3 bottom-3 text-green-500">✓</div><div id="${msgObj.userid}-${msgObj.messageNum}-status" class="absolute right-3 bottom-3 flex gap-1 bg-white rounded-full overflow-clip z-10"><img src="dp-${cr_id}.png" class="w-5 h-5 rounded-full opacity-60" /><img class="h-3 w-3 m-1 animate-spin absolute" src="/loading.png" /></div></div>`;
  });

  socket.on('message', msg => {
    // console.log(msg);
    let msgObj = JSON.parse(msg);
    // console.log(msgObj);
    if (msgObj.userid == userid) return
    console.log(`${msgObj.userid}-${msgObj.messageNum}-status`);
    let msgStatus = document.getElementById(`${msgObj.userid}-${msgObj.messageNum}-status`);
    console.log(msgStatus);
    msgStatus.parentNode.removeChild(msgStatus);
    console.log(`${msgObj.userid}-${msgObj.messageNum}-text`);
    let msgText = document.getElementById(`${msgObj.userid}-${msgObj.messageNum}-text`);
    console.log(msgText);
    msgText.innerHTML = msgObj.text;
  });

  function handleEnter(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMsg();
    }
  }

  function sendMsg() {
    if (textVal == "") return
    chatDiv.innerHTML = chatDiv.innerHTML + `<div class="mb-1 flex gap-2 items-start w-full relative p-2"><p class="w-full p-3 mr-7 break-words bg-blue-100 rounded-md rounded-br-none relative">${textVal}<div class="absolute right-12 bottom-3 text-green-500">✓</div><div id="mymsg-${messageNum}" class="absolute right-12 bottom-3 flex gap-1 bg-white rounded-full overflow-clip z-10"><img src="dp-${cr_id}.png" class="w-5 h-5 rounded-full opacity-60" /><img class="h-3 w-3 m-1 animate-spin absolute" src="/loading.png" /></div></p><p class="text-xs flex-none w-8 overflow-clip text-white bg-blue-500 rounded-full p-2 absolute right-0 bottom-0">${$username}</p></div>`;
    socket.emit('message', JSON.stringify({chatroomid: cr_id, userid: userid, username: $username, moderator: cr_moderator, text: textVal, messageNum: messageNum}), (response) => {
      // console.log(response);
      let mymsg = document.getElementById(`mymsg-${response}`);
      mymsg.parentNode.removeChild(mymsg);
    });
    messageNum += 1;
    textVal = "";
  }

  afterUpdate(() => {
    chatDiv.scrollTop = chatDiv.scrollHeight
  });
</script>


<div class="flex justify-center h-[100svh]">
  <div class="w-[600px] flex flex-col items-stretch xs:m-6 xs:gap-6">
    <div class="flex items-center justify-between flex-row gap-6 bg-gray-100 xs:bg-gradient-to-tl xs:from-pink-100 xs:via-purple-100 xs:to-indigo-100 py-3 px-6 xs:rounded-md xs:shadow-md">
      <button class="btn bg-indigo-100 xs:bg-indigo-50 px-2 py-0 -ml-3" on:click={() => {socket.disconnect() ; $chatroom = 0;}}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 stroke-2 stroke-gray-700">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>        
      </button>
      <div class="text-right text-sm">
        <p><span class="font-semibold">{$username}</span> is currently in Chatroom {$chatroom}</p>
        <p>moderated by {cr_displayname}</p>
      </div>
    </div>
    <div class="flex justify-center flex-col gap-6 bg-gradient-to-tl from-pink-100 via-purple-100 to-indigo-100 p-6 xs:rounded-md xs:shadow-md grow">
      <div bind:this={chatDiv} class="text-left text-sm w-full h-80 bg-white rounded-md p-3 overflow-y-scroll overscroll-x-none grow">
      </div>
      <div class="w-full flex flex-col gap-3">
        <div class="flex flex-col gap-1">
          <span class="text-xs text-gray-400">message</span>
          <textarea bind:value={textVal} on:keypress={handleEnter} class="textarea w-full text-base" ></textarea>
        </div>
      </div>
      <button class="btn btn-primary self-end" on:click={sendMsg} on:keypress={handleEnter}>Send</button>
    </div>
  </div>
</div>