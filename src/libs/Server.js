import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import Express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { PubSub } from 'apollo-server';

import { errorHandlerRoute, notFoundRoute } from './routes';
import { AuthenticationService, UserManagementService, LoggerService } from '../services';
import { route } from '../controller';

class Server {
  constructor(config) {
    this.config = config;
    this.app = new Express();
  }

  get application() {
    return this.app;
  }

  bootstrap() {
    this.initCors();
    this.initCookieParser();
    this.initBodyParser();

    return this;
  }

  setupApollo(data) {
    const { app } = this;
    const pubSub = new PubSub();
    pubSub.ee.setMaxListeners(30);
    const auth = new AuthenticationService();
    const logger = new LoggerService();

    this.server = new ApolloServer({
      ...data,
      context: ({ req, connection }) => auth.authenticate({ req, connection, pubSub, logger }),
      dataSources: () => ({
        userManagementService: new UserManagementService(),
      }),
    });

    this.server.applyMiddleware({ app });
    this.setupRoutes();
    this.run();

    return this;
  }

  setupRoutes() {
    const { app } = this;

    app.use('/health-check', (_, res) => {
      res.send('I am OK');
    });

    app.use('/', route);

    app.use(notFoundRoute);
    app.use(errorHandlerRoute);
  }

  run() {
    const { app, server } = this;
    const { port, env } = this.config;

    server.installSubscriptionHandlers(app.listen(port, () => {
      console.info(`server started on port ${port} (${env})`);
    }));

    return this;
  }

  initCors() {
    const corsOptions = {
      origin: '*',
      credentials: true,
    }

    this.app.use(cors(corsOptions));
  }

  initCookieParser() {
    this.app.use(cookieParser());
  }

  initBodyParser() {
    const { app } = this;

    app.use(bodyParser.json({
      limit: '50mb',
    }));

    app.use(bodyParser.urlencoded({
      extended: true,
      limit: '50mb',
      parameterLimit: 100000,
    }));
  }
}

export default Server;
