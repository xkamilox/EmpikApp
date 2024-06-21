import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Registration from './registration';
import { register } from '../../actions/auth';
import { isEmail } from 'validator';

jest.mock('../../actions/auth', () => ({
  register: jest.fn(() => Promise.resolve()),
}));

jest.mock('validator', () => ({
  isEmail: jest.fn(),
}));

const mockStore = configureStore([]);

describe('Registration', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: { isLoggedIn: false },
      message: '',
    });

    store.dispatch = jest.fn(action => Promise.resolve(action));
  });

  test('renders Registration form', () => {
    render(
      <Provider store={store}>
        <Router>
          <Registration />
        </Router>
      </Provider>
    );

    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Repeat password')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  test('shows validation errors for empty fields', () => {
    render(
      <Provider store={store}>
        <Router>
          <Registration />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByText('Register'));

    expect(screen.getByText('username should contain between 3 and 20 characters')).toBeInTheDocument();
    expect(screen.getByText('Email should contain more than 0 and less than 50 characters')).toBeInTheDocument();
    expect(screen.getByText('password is required')).toBeInTheDocument();
    expect(screen.getByText('repeat password')).toBeInTheDocument();
  });

  test('shows validation errors for invalid email', () => {
    isEmail.mockReturnValue(false);

    render(
      <Provider store={store}>
        <Router>
          <Registration />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'invalid-email' } });
    fireEvent.click(screen.getByText('Register'));

    expect(screen.getByText('Invalid email format')).toBeInTheDocument();
  });

  test('shows validation errors for mismatched passwords', () => {
    render(
      <Provider store={store}>
        <Router>
          <Registration />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Repeat password'), { target: { value: 'differentpassword' } });
    fireEvent.click(screen.getByText('Register'));

    expect(screen.getByText('passwords are not the same')).toBeInTheDocument();
  });

  test('dispatches register action on successful form submission', async () => {
    isEmail.mockReturnValue(true);

    render(
      <Provider store={store}>
        <Router>
          <Registration />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'validUsername' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'valid.email@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'validpassword123' } });
    fireEvent.change(screen.getByPlaceholderText('Repeat password'), { target: { value: 'validpassword123' } });

    fireEvent.click(screen.getByText('Register'));

    await waitFor(() => expect(store.dispatch).toHaveBeenCalledWith(register('validUsername', 'valid.email@example.com', 'validpassword123')));
  });
});
