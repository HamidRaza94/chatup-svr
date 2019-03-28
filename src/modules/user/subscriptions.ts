import { FRIEND_MADE, MESSAGE_CREATED, pubsub, USER_ADDED } from '../../subscription';

const Subscription = {
    userAdded: {
        subscribe: () => pubsub.asyncIterator(USER_ADDED),
    },

    messageSent: {
        subscribe: () => pubsub.asyncIterator(MESSAGE_CREATED),
    },

    friendMade: {
        subscribe: () => pubsub.asyncIterator(FRIEND_MADE),
    },
};

export default Subscription;
