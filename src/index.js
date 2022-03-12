import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainComponent from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { store, persistor } from './redux/configureStore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
    <MainComponent client={client}/>
    </BrowserRouter>
    </PersistGate>
    </Provider>
  
    
    </ApolloProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);
