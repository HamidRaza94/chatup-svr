import { IMessage, IUser } from './interface';

const users: IUser[] = [
    {
        email: 'hamid@successive.tech',
        friends: [1],
        id: 0,
        name: 'Hamid',
    },

    {
        email: 'vishal@successive.tech',
        friends: [0],
        id: 1,
        name: 'Vishal',
    },
];

const messages: IMessage[] = [
    {
        from: 0,
        id: 0,
        text: 'Hello bro',
        to: 1,
    },
];

export { users, messages };
