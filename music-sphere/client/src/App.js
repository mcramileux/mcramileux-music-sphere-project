// THIS IS THE APP THAT WILL LOAD TO THE WEB
import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import SignupForm from './pages/SignupForm';
import LoginForm from './pages/LoginForm';
// import SingleThought from './pages/SingleThought';
import SavedAlbums from './components/SavedAlbums';
import SearchAlbums from './components/SearchAlbums';
import MyProfile from './pages/MyProfile';
import Header from './components/Header';
import Footer from './components/Footer';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="flex-column justify-flex-start min-100-vh">
            <Header />
            <div className="container">
              <Routes>
                <Route 
                  path="/"
                  element={<Home />}
                />
                <Route 
                  path="/login" 
                  element={<LoginForm />}
                />
                <Route 
                  path="/signup" 
                  element={<SignupForm />}
                />
                <Route 
                  path="/me" 
                  element={<MyProfile />}
                />
                <Route 
                  path="/profiles/:username" 
                  element={<MyProfile />}
                />
                {/* <Route 
                  path="/thoughts/:thoughtId" 
                  element={<SingleThought />}
                />
              </Routes> */}
              <Route 
                  path="/" 
                  element={<SearchAlbums />}
                />
              </Routes>
              <Route 
                  path="/saved" 
                  element={<SavedAlbums />}
                />
              {/* <Route
              path='*'
              element={<h1 className='display-2'>Wrong page!</h1>}
            />
          </Routes> */}
            </div>
            <Footer />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
  
export default App;