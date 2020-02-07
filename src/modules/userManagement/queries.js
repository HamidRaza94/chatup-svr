import { DateTimeResolver } from 'graphql-scalars';

const Query = {
  Date: DateTimeResolver,

  me: async (_, __, { user }) => {
    try {
      console.log('me: ', user);
      return user;
    } catch(error) {
      console.log('ERROR: me - ', error);
      return error;
    }
  },

  getFriends: async (_, __, { dataSources, logger, user: { id } }) => {
    try {
      const result = dataSources.userManagementService.getFriends(id);
      logger.log.info('getFriends : result :', result);
      return result;
    } catch(error) {
      console.log('ERROR: getFriends - ', error);
      return error;
    }
  },

  getMessages: async (_, args, { dataSources, logger, user: { id } }) => {
    try {
      logger.log.info('getMessages : args :', args);
      const { to } = args;
      const result = dataSources.userManagementService.getMessages(id, to);
      logger.log.info('getMessages : result :', result);
      return result;
    } catch(error) {
      console.log('ERROR: getMessages - ', error);
      return error;
    }
  },

  checkUser: async (_, { email, password }, { dataSources }) => {
    try {
      return dataSources.userManagementService.checkUser({ email, password });
    } catch (error) {
      console.log('ERROR: checkUser - ', error);
      return error;
    }
  },

  getAllUsers: async (_, __, { dataSources }) => {
    try {
      console.log('getAllUser --');
      const result = dataSources.userManagementService.getAllUsers();
      console.log('getAllUser result--->', result);
      return result;
    } catch(error) {
      console.log('ERROR: getAllUsers - ', error);
      return error;
    }
  },

  getUserById: async (_, { id }, { dataSources }) => {
    try {
      return dataSources.userManagementService.getUser({ id });
    } catch (error) {
      console.log('ERROR: getUser - ', error);
      return error;
    }
  },

  getMessageById: async (_, { userId, id }, { dataSources }) => {
    try {
      return dataSources.userManagementService.getMessageById({ id });
    } catch (error) {
      console.log('ERROR: getMessage - ', error);
      return error;
    }
  },

  getMessagesByUserId: async (_, { id }, { dataSources }) => {
    try {
      return dataSources.userManagementService.getMessagesByUserId({ id });
    } catch (error) {
      console.log('ERROR: getMessages - ', error);
      return error;
    }
  },

  getMessagesByUserEmail: async (_, { email }, { dataSources }) => {
    try {
      return dataSources.userManagementService.getMessagesByUserEmail({ email });
    } catch (error) {
      console.log('ERROR: getMessages - ', error);
      return error;
    }
  },

  getAllMessages: async (_, __, { dataSources }) => {
    try {
      return dataSources.userManagementService.getAllMessages();
    } catch (error) {
      console.log('ERROR: getMessages - ', error);
      return error;
    }
  },

  getFriendListWithMessages: async (_, __, { dataSources, user }) => {
    try {
      return dataSources.userManagementService.getFriendListWithMessages({ userId: user.id });
    } catch (error) {
      console.log('ERROR: getMessages - ', error);
      return error;
    }
  },

  getFriendListWithLastMessage: async (_, __, { dataSources, user: { id } }) => {
    try {
      return dataSources.userManagementService.getFriendList(id);
    } catch (error) {
      console.log('ERROR: getFriendListWithLastMessage - ', error);
      return error;
    }
  },
}

export default Query;
