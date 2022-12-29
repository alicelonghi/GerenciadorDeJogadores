import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";

import { onError } from "@apollo/client/link/error"
import SoccerPlayersList from "./components/soccerPlayersList";

const errorLink = onError(({ graphqlErrors, networkError}) => {
  if (graphqlErrors) {
    graphqlErrors.map(( {message, location, path}) => {
      alert(`Erro no Graphql -- ${message}`)
    })
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "https://test-players-rbs.hasura.app/v1/graphql"})
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})

function App() {
  return <ApolloProvider client={client}>
    <SoccerPlayersList />
  </ApolloProvider>;
}

export default App;
