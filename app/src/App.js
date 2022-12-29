import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";

import { onError } from "@apollo/client/link/error";
import SoccerPlayersList from "./components/soccerPlayersList";
import EditSoccerPlayer from "./components/editSoccerPlayer";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message }) => {
      alert(`Erro no Graphql -- ${message}`);
    });
  }
})

const link = from([
  errorLink,
  new HttpLink({ uri: "https://test-players-rbs.hasura.app/v1/graphql" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <Routes>
          <Route exact path="/" element={<SoccerPlayersList/>}/>
          <Route exact path="/edit" element={<EditSoccerPlayer/>}/>
        </Routes>
      </ApolloProvider>
    </Router>
  );
}

export default App;
