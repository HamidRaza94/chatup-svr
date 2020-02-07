import { withFilter } from 'apollo-server';

import { USER_ADDED, MESSAGE_SENT, FRIEND_MADE } from './constants';

const Subscription = {
  userAdded: {
    subscribe: (_, __, { pubSub }) => pubSub.asyncIterator(USER_ADDED),
  },

  messageSent: {
    subscribe: withFilter(
      (_, __, { pubSub }) => pubSub.asyncIterator(MESSAGE_SENT),
      (payload, _, { user: { id } }) => payload.messageSent.to === id,
    ),
  },

  friendMade: {
    subscribe: (_, __, { pubSub }) => pubSub.asyncIterator(FRIEND_MADE),
  },
};

export default Subscription;
