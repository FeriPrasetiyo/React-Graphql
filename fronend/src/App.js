import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Phonebookbox from './components/Phonebookbox';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Phonebookbox />
    </ApolloProvider>
  );
}

export default App;
