import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainComponent from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    
   
    <ApolloProvider client={client}>
    <BrowserRouter>
    <MainComponent client={client}/>
    </BrowserRouter>
    </ApolloProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);
