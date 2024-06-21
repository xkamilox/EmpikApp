import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Login from './login.jsx';
import '@testing-library/jest-dom';
import {UserContext} from "../../App.jsx";
import { GoogleOAuthProvider } from '@react-oauth/google';

const mockStore = configureStore([]);

describe('Login', () => {
    let store;
    let component;
  
    beforeEach(() => {
      store = mockStore({
        user: {
          isLoggedIn: false,
        },
        message: '',
      });
  
      store.dispatch = jest.fn();
  
      const mockUserContext = {
        userRoleContext: 'user',
        setUserRoleContext: jest.fn(),
      };
  
      component = render(
        <GoogleOAuthProvider clientId="your-google-oauth-client-id">
          <UserContext.Provider value={mockUserContext}>
            <Provider store={store}>
              <Router>
                <Login />
              </Router>
            </Provider>
          </UserContext.Provider>
        </GoogleOAuthProvider>
      );
    });

  it('renders correctly', () => {
    const { getByPlaceholderText } = component;
    expect(getByPlaceholderText('Username')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
  });

});