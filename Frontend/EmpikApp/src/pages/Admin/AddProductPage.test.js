import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import axiosInstance from "../../interceptors/axiosInstance.jsx";
import AddProductPage from './AddProductPage';
import '@testing-library/jest-dom';

jest.mock('../../interceptors/axiosInstance.jsx');

describe('AddProductPage', () => {
    it('renders correctly', () => {
        const { getByPlaceholderText } = render(<AddProductPage />);
        expect(getByPlaceholderText('Name')).toBeInTheDocument();
        expect(getByPlaceholderText('Price')).toBeInTheDocument();
    });

    it('handles form submission', async () => {
        const { getByPlaceholderText, getByText } = render(<AddProductPage />);
        const nameInput = getByPlaceholderText('Name');
        const priceInput = getByPlaceholderText('Price');

        fireEvent.change(nameInput, { target: { value: 'Test Product' } });
        fireEvent.change(priceInput, { target: { value: '100' } });

        axiosInstance.post.mockResolvedValueOnce({ data: {} });

        fireEvent.click(getByText('Create Product'));

        expect(axiosInstance.post).toHaveBeenCalledWith('/products', expect.any(FormData), {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    });
});