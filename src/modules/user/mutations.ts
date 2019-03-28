import { FRIEND_MADE, MESSAGE_CREATED, pubsub, USER_ADDED } from '../../subscription';
import { messages, users } from './constants';
import { IMessage, IUser } from './interface';

const Mutation = {
    addUser: (parent: undefined, args: { name: string, email: string }): IUser => {
        const user: IUser = {
            email: args.email,
            friends: [],
            id: users.length,
            name: args.name,
        };

        users.push(user);
        pubsub.publish(USER_ADDED, { userAdded: user });
        return user;
    },

    sendMessage: (parent: undefined, args: { from: number, to: number, text: string }): IMessage => {
        const message: IMessage = {
            from: args.from,
            id: messages.length,
            text: args.text,
            to: args.to,
        };

        messages.push(message);
        pubsub.publish(MESSAGE_CREATED, { messageSent: message });
        return message;
    },

    makeFriend: (parent: undefined, args: { from: number, to: number }): string => {
        let isFriend: boolean = false;
        let message: string;

        users[args.from].friends.every((element) => {
            if (element === args.to) {
                isFriend = true;
                return false;
            } else {
                isFriend = false;
                return true;
            }
        });

        if (!isFriend) {
            users[args.from].friends.push(args.to);
            users[args.to].friends.push(args.from);
            message = `You are friend now with ${users[args.to].name}`;
            pubsub.publish(FRIEND_MADE, { friendMade: message });
        } else {
            message = `You are already friend with ${users[args.to].name}`;
        }

        return message;
    },
};

export default Mutation;
