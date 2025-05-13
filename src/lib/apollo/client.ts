'use client';

import {
  ApolloLink,
  HttpLink,
} from '@apollo/client';
import {
  ApolloClient,
  InMemoryCache,
  SSRMultipartLink,
} from '@apollo/client-integration-nextjs';

export function makeClient() {
  const httpLink = new HttpLink({
    uri: 'https://rickandmortyapi.com/graphql',
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: typeof window === 'undefined'
      ? ApolloLink.from([
          new SSRMultipartLink({
            stripDefer: true,
          }),
          httpLink,
        ])
      : httpLink,
  });
}