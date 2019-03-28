import { resolve } from 'path';
import { loadGQLFiles, mergeResolvers } from './libs';
import * as modules from './modules';

export default {
    typeDefs: loadGQLFiles(resolve(__dirname, '../src/**/*.graphql')),
    resolvers: mergeResolvers(modules),
};
