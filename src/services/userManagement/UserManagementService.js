import { mockUsers, mockConversations, mockOnline } from './mock';

class UserManagementService {
  getAllUsers() {
    return mockUsers.map(({ id, name, email, friends }) => ({ id, name, email, friends }));
  }

  addUser({ name, email, password }) {
    const isUserExist = mockUsers.some((user) => user.email === email);

    if (isUserExist) {
      throw new Error({
        error: 'Bad Request',
        message: 'User already exist',
        status: 404,
      }); 
    }

    const id = (mockUsers.length + 1).toString();
    const friends = [];
    mockUsers.push({ id, name, email, friends, password });

    return ({ id, name, friends, email });
  }

  checkUser({ email, password }) {
    return mockUsers.some((user) => (user.email === email && user.password === password));
  }

  getUser({ id }) {
    const user = mockUsers.find((user) => user.id === id);

    if (!user) {
      throw new Error({
        error: 'Bad Request',
        message: 'User not found',
        status: 404,
      });
    }

    return user;
  }

  sendMessage(from, to, message, createdAt) {
    const isFromExist = mockUsers.some((user) => user.id === from);

    if (!isFromExist) {
      throw new Error({
        error: 'Bad Request',
        message: 'User (from) not found',
        status: 404,
      });
    }

    const isToExist = mockUsers.some((user) => user.id === to);

    if (!isToExist) {
      throw new Error({
        error: 'Bad Request',
        message: 'User (to) not found',
        status: 404,
      });
    }

    const id = (mockConversations.length + 1).toString();
    mockConversations.push({ id, from, to, message, createdAt });

    return ({ id, from, to, message, createdAt });
  }

  getAllMessages() {
    return mockConversations;
  }

  getMessageById({ id }) {
    const message = mockConversations.find((message) => message.id === id);

    if (!message) {
      throw new Error({
        error: 'Bad Request',
        message: 'Id not found',
        status: 404,
      });
    }

    return message;
  }

  getMessages(userId, receiverId) {
    const isValidUserId = mockUsers.some((user) => user.id === userId);

    if (!isValidUserId) {
      throw new Error({
        error: 'Bad Request',
        message: 'Id not found',
        status: 404,
      });
    }

    return mockConversations.filter(({ from, to }) => (from === userId && to === receiverId) || (to === userId && from === receiverId));
  }

  getMessagesByUserId({ id }) {
    const isValidUserId = mockUsers.some((user) => user.id === id);

    if (!isValidUserId) {
      throw new Error({
        error: 'Bad Request',
        message: 'Id not found',
        status: 404,
      });
    }

    return mockConversations.filter((message) => message.from === id);
  }

  getMessagesByUserEmail({ email }) {
    const user = mockUsers.find((user) => user.email === email);

    if (!user) {
      throw new Error({
        error: 'Bad Request',
        message: 'Email not found',
        status: 404,
      });
    }

    return mockConversations.filter((message) => message.from === user.id);
  }

  makeFriend({ from, to }) {
    const isFromExist = mockUsers.some((user) => user.id === from);

    if (!isFromExist) {
      throw new Error({
        error: 'Bad Request',
        message: 'User (from) not found',
        status: 404,
      });
    }

    const isToExist = mockUsers.some((user) => user.id === to);

    if (!isToExist) {
      throw new Error({
        error: 'Bad Request',
        message: 'User (to) not found',
        status: 404,
      });
    }

    const friend = mockUsers.find((user) => user.id === to);
    const isAlreadyFriend = mockUsers.some((user) => user.id === from && user.friends.includes(to));

    if (isAlreadyFriend) {
      return `You are already friend of ${friend.name}`;
    }

    mockUsers.every((user) => {
      if (user.id === from) {
        user.friends.push(to);
        return false;
      }
      
      return true;
    });

    return `You are friend of ${friend.name} now`;
  }

  getFriendListWithMessages({ userId }) {
    const index = mockUsers.findIndex((user) => user.id === userId);
    const friendsId = [...mockUsers[index].friends];
    console.log('friendsId ==>', friendsId);

    const friendList = mockUsers.map((user) => {
      if (friendsId.includes(user.id)) {
        const conversations = mockConversations.map(({ from, to, id, message, createdAt }) => {
          if ((from === userId && to === user.id) || (from === user.id && to === userId)) {
            return ({
              id,
              from,
              to,
              message,
              createdAt,
            });
          }
        }).filter((item) => item);

        const sortedConversations = conversations.sort((current, next) => (new Date(current.createdAt) - new Date(next.createdAt)));

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          conversations: sortedConversations,
        }
      }
    }).filter((user) => user);

    console.log('friendList =>', friendList);
    return friendList;

    // const friendsId = mockUsers.map((user) => {
    //   if (user.id === userId) {

    //   }
    // })
  }

  getFriendList(id) {
    const isValidUser = mockUsers.some((user) => user.id === id);

    if (!isValidUser) {
      throw new Error({
        error: 'Bad Request',
        message: 'User ID is not valid',
        status: 404,
      });
    }

    let friendId;
    
    mockUsers.forEach((user) => {
      if (user.id === id) {
        friendId = user.friends;
      }
    });

    const friendList = mockUsers.map((user) => {
      if (friendId.includes(user.id)) {
        const messages = mockConversations.filter((conversation) => (conversation.from === id && conversation.to === user.id) || (conversation.from === user.id && conversation.to === id));
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          lastMessage: messages.length ? messages[messages.length - 1].message : '',
        }
      }
    }).filter((user) => user);

    console.log('friendList =>', friendList);
    return friendList;
  }

  login({ email, password }) {
    const user = mockUsers.find((user) => (user.email === email && user.password === password));

    if (!user) {
      throw new Error('Either email or password is wrong');
    }

    mockOnline.push(user.id);

    return user;
  }

  getFriends(userId) {
    const isValidUser = mockUsers.some((user) => user.id === userId);

    if (!isValidUser) {
      throw new Error({
        error: 'Bad Request',
        message: 'User ID is not valid',
        status: 404,
      });
    }

    let friendId;
    
    mockUsers.forEach((user) => {
      if (user.id === userId) {
        friendId = user.friends;
      }
    });

    const friendList = mockUsers
      .filter((user) => friendId.includes(user.id))
      .map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
      })
    );

    console.log('friendList =>', friendList);
    return friendList;
  }
}

export default UserManagementService;
