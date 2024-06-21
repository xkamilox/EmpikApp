import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FavoriteService from '../../services/favoriteService';

import "../../styles/favourite.css";

function FavoriteProduct({ favoriteProduct, onChange }) {
    const [isHeartHovered, setIsHeartHovered] = useState(false);

    const removeFromFavorites = async () => {
        await FavoriteService.removeProductFromFavorites(favoriteProduct.id);
        onChange();
    };

    const handleMouseEnter = () => setIsHeartHovered(true);
    const handleMouseLeave = () => setIsHeartHovered(false);

    return (
        <div className="favorite-product-container">
            <img
                className="product-image"
                src={favoriteProduct.imagePath}
                alt={favoriteProduct.name}
            />
            <div className="product-info">
                <p className="product-name">{favoriteProduct.name}</p>
                <p className="product-producer">{favoriteProduct.producer}</p>
                <p className="product-price">{favoriteProduct.price} zł</p>
            </div>
            <img
                className="remove-icon"
                src={isHeartHovered ? '/images/heart_unfilled.png' : '/images/HeartStraight.png'}
                alt="remove"
                onClick={removeFromFavorites}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                width="35"
                height="35"
            />
        </div>
    );
}

FavoriteProduct.propTypes = {
    favoriteProduct: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        producer: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        variant: PropTypes.string.isRequired,
        imagePath: PropTypes.string.isRequired,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
};

export default FavoriteProduct;
