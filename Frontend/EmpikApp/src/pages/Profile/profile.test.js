import React from 'react';
import { act } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Profile from './profile.jsx';
import { UserContext } from '../../App.jsx';
import FavoriteService from '../../services/favoriteService.js';
import store from '../../store';
import '@testing-library/jest-dom';

jest.mock('../../services/favoriteService.js');

describe('Profile', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <UserContext.Provider value={{ userRoleContext: 'user', setUserRoleContext: jest.fn() }}>
          <BrowserRouter>
            <Profile />
          </BrowserRouter>
        </UserContext.Provider>
      </Provider>
    );
  });

  it('fetches user favorites on mount', async () => {
    FavoriteService.getUserFavorites.mockResolvedValue([]);
    await act(async () => {
    render(
      <Provider store={store}>
        <UserContext.Provider value={{ userRoleContext: 'user', setUserRoleContext: jest.fn() }}>
          <BrowserRouter>
            <Profile />
          </BrowserRouter>
        </UserContext.Provider>
      </Provider>
    );
    });
    await waitFor(() => expect(FavoriteService.getUserFavorites).toHaveBeenCalledTimes(1));
  });
});