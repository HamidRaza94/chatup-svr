import { resolve } from 'path';
import { makeExecutableSchema } from 'apollo-server';

import { config } from './config';
import * as modules from './modules';
import { loadGQLFiles, mergeResolvers, Server } from './libs';

(() => {
  const typeDefs = loadGQLFiles(resolve(__dirname, './**/*.graphql'));
  const resolvers = mergeResolvers(modules);
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const server = new Server(config);
  server.bootstrap().setupApollo({ schema });
})();
