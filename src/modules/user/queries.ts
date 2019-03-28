import { messages, users } from './constants';
import { IMessage, IUser } from './interface';

const Query = {
    getAllUser: (): IUser[] => {
        return users;
    },

    getUser: (parent: undefined, { id }: { id: number}): IUser => {
        return users.filter((data: IUser) => data.id === id)[0];
    },

    getUserMessage: (parent: undefined, { userId }: { userId: number}): IMessage[] => {
        return messages.filter((data: IMessage) => data.from === userId);
    },
};

export default Query;
