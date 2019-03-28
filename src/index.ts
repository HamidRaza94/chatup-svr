import { makeExecutableSchema } from 'apollo-server';
import { config } from './config';
import schema from './schema';
import Server from './Server';

const server: Server = new Server(config);

const initServer = () => {
    server.setupApollo({ schema: makeExecutableSchema(schema) });
};

initServer();
