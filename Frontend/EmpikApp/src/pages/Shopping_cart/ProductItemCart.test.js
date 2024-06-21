import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ProductItemCart from './ProductItemCart';
import '@testing-library/jest-dom';

jest.mock('../../services/basketService.js', () => ({
  removeFromUserBasket: jest.fn(),
  addToUserBasket: jest.fn(),
  removeFromLocalStorageBasket: jest.fn(),
  addToLocalStorageBasket: jest.fn(),
}));

const mockProduct = {
  id: 1,
  name: 'Test Product',
  producer: 'Test Producer',
  price: 100,
  quantity: 1,
  variant: 'Test Variant',
  addToOrder: false,
};

const mockStore = createStore(() => ({
  user: {
    isLoggedIn: false,
  },
}));

describe('ProductItemCart', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <Provider store={mockStore}>
        <ProductItemCart product={mockProduct} onChange={jest.fn()} />
      </Provider>
    );

    expect(getByText(/Test Product Test Variant/i)).toBeInTheDocument();
    expect(getByText(/Test Producer/i)).toBeInTheDocument();
    expect(getByText(/Ilość: 1/i)).toBeInTheDocument();
    expect(getByText(/Cena: 100 zł/i)).toBeInTheDocument();
  });

  it('handles add to cart button click', () => {
    const { getByText } = render(
      <Provider store={mockStore}>
        <ProductItemCart product={mockProduct} onChange={jest.fn()} />
      </Provider>
    );

    fireEvent.click(getByText('+'));

  });

  it('handles remove from cart button click', () => {
    const { getByText } = render(
      <Provider store={mockStore}>
        <ProductItemCart product={mockProduct} onChange={jest.fn()} />
      </Provider>
    );

    fireEvent.click(getByText('-'));
  });
});