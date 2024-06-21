import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Product from './product';
import '@testing-library/jest-dom';
import {UserContext} from "../../App.jsx";

const mockStore = configureStore([]);

describe('Product', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: {
        isLoggedIn: false,
      },
    });

    render(
      <Provider store={store}>
        <UserContext.Provider value={{ userRoleContext: {}, setUserRoleContext: jest.fn() }}>
        <Router>
          <Product />
        </Router>
        </UserContext.Provider>
      </Provider>
    );
  });

  test('renders Product component', () => {
    expect(screen.getByPlaceholderText(/Enter what you are looking for/i)).toBeInTheDocument();
  });
  
  test('updates search term on input change', async () => {
    fireEvent.change(screen.getByPlaceholderText(/Enter what you are looking for/i), {
      target: { value: 'test' },
    });

    await waitFor(() => {
      expect(screen.getByDisplayValue(/test/i)).toBeInTheDocument();
    });
  });

});