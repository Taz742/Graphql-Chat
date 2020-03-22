import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { setContext } from 'apollo-link-context';
import { OperationDefinitionNode } from 'graphql';

const httpLink = new HttpLink({
  uri: 'http://localhost:3001/graphql',
});

const wsLink = new WebSocketLink({
  // uri: 'ws://localhost:3001/graphql',
  // options: {
  //   reconnect: true,
  // }
    uri: 'ws://localhost:3001/graphql',
    options: {
      lazy: true,
      reconnect: true,
      connectionParams: () => {
        const token = localStorage.getItem("token");

        return {
          headers: {
            authorization: token,
          },
        }
      },
    },

});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token
    }
  }
});

const terminatingLink = split(
  ({ query: { definitions } }) =>
    definitions.some(node => {
      const { kind, operation } = node as OperationDefinitionNode;
      return kind === 'OperationDefinition' && operation === 'subscription';
    }),
  wsLink,
  httpLink
);

const link = ApolloLink.from([terminatingLink]);

export const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache()
});
