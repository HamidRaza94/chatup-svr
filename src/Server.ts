import { ApolloServer } from 'apollo-server';
import { IConfig } from './config';

class Server {
    public server: ApolloServer;

    constructor(private config: IConfig) {
    }

    public async setupApollo(data: any) { // data return type
        this.server = new ApolloServer(data);
        this.run();
    }

    public run() {
        const {
            server,
            config : { PORT },
        } = this;

        server.listen(PORT, () => {
            console.info(`App is running on port ${PORT}`);
        });
        return this;
    }
}

export default Server;
