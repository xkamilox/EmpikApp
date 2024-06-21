import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Shopping_cart from './shopping_cart.jsx';
import { logout } from "../../actions/auth.js";
import { BrowserRouter } from 'react-router-dom';

jest.mock("../../actions/auth.js");

const mockStore = configureStore([]);

describe('Shopping_cart', () => {
    let store;
    let component;

    beforeEach(() => {
        store = mockStore({
            user: {
                isLoggedIn: true,
            },
        });

        store.dispatch = jest.fn();

        component = render(
            <Provider store={store}>
                <BrowserRouter>
                <Shopping_cart />
                </BrowserRouter>
            </Provider>
        );
    });

    it('should render with given state from Redux store', () => {
        expect(component).toMatchSnapshot();
    });

    it('should dispatch logout action on logout button click', () => {
        fireEvent.click(component.getByText('Log Out'));
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(logout).toHaveBeenCalledTimes(1);
    });

    it('should display total basket price', () => {
        const {  getAllByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Shopping_cart />
                </BrowserRouter>
            </Provider>
        );
        const totalPrices = getAllByText(/Cena całkowita:/i);
        expect(totalPrices.length).toBe(2)
    });
});