import { writable, readable } from 'svelte/store';

export const username = writable("");
export const chatroom = writable(0);

export const chatroomsInfo = [
  {
    cr_id: 1,
    cr_moderator: "Bella Swan",
    cr_displayname:"Bella",
  },
  {
    cr_id: 2,
    cr_moderator: "Puss in Boots",
    cr_displayname:"Kitty",
  },
  {
    cr_id: 3,
    cr_moderator: "James Bond",
    cr_displayname:"James",
  },
]