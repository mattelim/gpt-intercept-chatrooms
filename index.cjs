require('dotenv').config()

const OpenAI = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const express = require("express");
const { Server } = require("socket.io");
const app = express();
const io = new Server();

const server = app.listen(3000, () => {
  console.log("Started server at ", server.address());
});
io.attach(server);

const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");

// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
    // console.log("development mode hehe");
    const liveReloadServer = livereload.createServer();
    liveReloadServer.server.once("connection", () => {
        setTimeout(() => {
            liveReloadServer.refresh("/");
        }, 50);
    });
    app.use(connectLiveReload());
}

app.use(express.json());
app.use(express.urlencoded());

const BASE_PATH = "/ci-client/dist"
app.use(express.static(process.cwd() + BASE_PATH));

app.get('/', async (_, res) => {
  res.sendFile(process.cwd() + BASE_PATH + "/index.html");
});

io.on("connection", (socket) => {
  console.log('A user connected: ' + socket.id);

  socket.on('userRoomInfo', (data) => {
    const { chatroomid, userid } = JSON.parse(data);
    socket.join(chatroomid);
    console.log(`User ${userid} joined room ${chatroomid}`);
  })

  socket.on('message', (message, callback) => {
    console.log("original message: ", message);
    let msgObj = JSON.parse(message)
    io.to(msgObj.chatroomid).emit('preMessage', JSON.stringify({userid: msgObj.userid, username: msgObj.username, text: msgObj.text, messageNum: msgObj.messageNum}))
    const reqState = openAPIreq(msgObj.chatroomid, msgObj.userid, msgObj.username, msgObj.moderator, msgObj.text, msgObj.messageNum);
    // callback(reqState);
    reqState.then((res) => {
      callback(res);
    });
  })

  socket.on("disconnect", () => {
    socket.leaveAll();
    // console.log(socket.rooms);
    console.log('A user disconnected: ' + socket.id);
  });
});

async function openAPIreq(chatroomid, userid, username, moderator, prompt, messageNum) {
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{
      "role": "user", 
      // "content": `Say this phrase as if you were Donald Trump: ${prompt}`
      // "content": `Say this phrase as if you were ${moderator}: ${prompt}`
      // "content": `You are ${moderator}. Your task is to moderate a piece of content and align it with your worldview. You can remove parts of the content or replace words. Avoid adding new words unless necessary. If the content fits your worldview, you can alter it slightly by changing some of its punctuation to fit your general tone. Keep the content to about the same length as the original. The content is: "${prompt}"`
      // "content": `You are ${moderator}. Your task is to moderate a piece of content and align it with your worldview. You can remove parts of the content or replace words. Do not add new words! Do not reveal yourself or what you have done within the moderated content. The original content is: "${prompt}"`
      "content": `You are ${moderator}. Your task is to moderate a piece of content and align it with your worldview. You can remove parts of the content or replace words. Do not add new words! Do not reveal yourself or what you have done within the moderated content. The original content is: "${prompt}". Your moderated content is:`
    }],
  });
  console.log(chatCompletion.choices[0].message);
  io.to(chatroomid).emit('message', JSON.stringify({userid: userid, username: username, messageNum: messageNum, text: chatCompletion.choices[0].message.content}))
  return messageNum;
}