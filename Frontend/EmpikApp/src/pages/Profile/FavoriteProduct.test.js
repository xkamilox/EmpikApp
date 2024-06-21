import { render, fireEvent, waitFor } from '@testing-library/react';
import FavoriteProduct from './FavoriteProduct';
import FavoriteService from "../../services/favoriteService.js";
import '@testing-library/jest-dom';

jest.mock("../../services/favoriteService.js");

describe('FavoriteProduct', () => {
    const mockProduct = {
        id: 1,
        name: 'Test Product',
        producer: 'Test Producer',
        price: 100,
        is_available: true,
        variant: 'Test Variant',
    };

    const mockOnChange = jest.fn();

    it('renders product details correctly', () => {
        const { getByText } = render(<FavoriteProduct favoriteProduct={mockProduct} onChange={mockOnChange} />);

        expect(getByText(mockProduct.name)).toBeInTheDocument();
        expect(getByText(mockProduct.variant)).toBeInTheDocument();
        expect(getByText(mockProduct.producer)).toBeInTheDocument();
        expect(getByText(`${mockProduct.price}`)).toBeInTheDocument();
    });

    it('calls onChange and removeProductFromFavorites when heart icon is clicked', async () => {
        const { getByAltText } = render(<FavoriteProduct favoriteProduct={mockProduct} onChange={mockOnChange} />);
        const heartIcon = getByAltText('remove');
    
        FavoriteService.removeProductFromFavorites.mockResolvedValueOnce();
    
        fireEvent.click(heartIcon);
    
        await waitFor(() => expect(FavoriteService.removeProductFromFavorites).toHaveBeenCalledWith(mockProduct.id));
        expect(mockOnChange).toHaveBeenCalled();
    });
});