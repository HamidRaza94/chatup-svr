import { PubSub } from 'apollo-server';

const pubsub = new PubSub();
const USER_ADDED = 'USER_ADDED';
const MESSAGE_CREATED = 'MESSAGE_CREATED';
const FRIEND_MADE = 'FRIEND_MADE';

export { pubsub, USER_ADDED, MESSAGE_CREATED, FRIEND_MADE };
