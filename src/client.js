// import { ApolloClient, InMemoryCache } from "@apollo/client";
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import {AUTH_TOKEN} from "./constants"
import {createHttpLink} from "apollo-link-http"

const httpLink = createHttpLink({
  uri: "http://localhost:5000/"
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      // authorization: token ? `Bearer ${token}` : "",
      authorization: `Bearer [token]`,
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
