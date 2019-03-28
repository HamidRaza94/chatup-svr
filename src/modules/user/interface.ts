interface IUser {
    email: string;
    friends: number[];
    id: number;
    name: string;
}

interface IMessage {
    from: number;
    id: number;
    text: string;
    to: number;
}

export { IUser, IMessage };
