import { ERROR_MESSAGES } from '../../libs';
import { USER_ADDED, MESSAGE_SENT, FRIEND_MADE } from './constants';

const Mutation = {
  addUser: async (_, { name, email, password }, { dataSources, pubSub }) => {
    try {
      const result = dataSources.userManagementService.addUser({ name, email, password });
      pubSub.publish(USER_ADDED, { userAdded: result });
      return result;
    } catch (error) {
      console.log('ERROR: addUser - ', error);
      return error;
    }
  },

  login: async (_, { email, password }, { dataSources, req }) => {
    try {
      console.log('req.cookies =>', req.cookies);
      const result = dataSources.userManagementService.login({ email, password });

      const payload = {
        id: result.id,
        email: result.email,
        name: result.name,
      }

      return dataSources.authenticationService.getToken(payload);
    } catch (error) {
      console.log('ERROR: addUser - ', error);
      return error;
    }
  },

  sendMessage: async (_, { to, message, createdAt }, { dataSources, pubSub, user: { id } }) => {
    try {
      console.log('sendMessage args =>', to, message, createdAt);
      const result = dataSources.userManagementService.sendMessage(id, to, message, createdAt);
      console.log('result');
      pubSub.publish(MESSAGE_SENT, { messageSent: result });
      return result;
    } catch (error) {
      console.log('ERROR: sendMessage - ', error);
      return error;
    }
  },

  makeFriend: async (_, { from, to }, { dataSources, pubSub, req }) => {
    try {
      const verifiedUser = dataSources.authenticationService.verifyToken(req.headers.authorization);

      if (verifiedUser.id !== from) {
        throw new Error(ERROR_MESSAGES.unAuthorisedUserFriendReq);
      }

      const result = dataSources.userManagementService.makeFriend({ from, to });
      pubSub.publish(FRIEND_MADE, { friendMade: result });
      return result;
    } catch (error) {
      console.log('ERROR: makeFriend - ', error);
      return error;
    }
  },
}

export default Mutation;
