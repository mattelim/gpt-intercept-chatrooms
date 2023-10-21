# GPT Intercept Chatrooms

## Description

Chatrooms that are "moderated" by characters that you can define. Whenever any user sends a message, they will see their message as they have sent it, but the receiver will get a message that has been "moderated". The "moderators" are powered by the OpenAI API and can be set ahead of time.

## Tech Stack 

- Nodejs + Express
- Socket.io
- Svelte + Tailwind + DaisyUI
- OpenAI API

## Instructions

Make sure to have [nodejs](https://nodejs.org/en) and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed on your computer. 
I recommend using VSCode to work on the project.

To get started on the project, open the project folder in VSCode, then open 2 terminal tabs. Using one of the terminals, change the directory to "ci-client" by typing `cd ci-client` on your shell/terminal.

Install dependencies on both directories:

```bash
npm install
```

Set up environment variables:

- Make sure to edit ".env.sample" by copying and pasting your OPENAI_API_KEY. Save the file as ".env"

To change the "moderators", edit the `ci-client/src/stores.js` file and update the relevant images in the `ci-client/public` folder.

### Development

To run the frontend dev server (on `ci-client` folder terminal):

```bash
npm run buildwatch
```

To run the backend dev server (on main folder terminal):

```bash
npm run dev
```

### Deployment

To create a final build of the frontend (on `ci-client` folder terminal):

```bash
npm run build
```

To run the backend production server (on main folder terminal):

```bash
npm run start
```
