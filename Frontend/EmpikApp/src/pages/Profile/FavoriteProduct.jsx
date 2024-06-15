

// eslint-disable-next-line react/prop-types
import PropTypes from "prop-types";
import axiosInstance from "../../interceptors/axiosInstance.jsx";
import {useState} from "react";
import FavoriteService from "../../services/favoriteService.js";

function FavoriteProduct({favoriteProduct, onChange} ) {
    const [isHeartHovered, setIsHeartHovered] = useState(false);


    const removeFromFavorites = async() => {
/*        await axiosInstance.delete("/favorites", {
            params: {
                productId: favoriteProduct.id,
            }
        });*/
        await FavoriteService.removeProductFromFavorites(favoriteProduct.id);
        onChange();
    }

    const handleMouseEnter = () => setIsHeartHovered(true);
    const handleMouseLeave = () => setIsHeartHovered(false);

    return (
        <div>
            {/* eslint-disable-next-line react/prop-types */}
            <p>{favoriteProduct.name}</p>
            <p>{favoriteProduct.variant}</p>
            <p>{favoriteProduct.producer}</p>
            <p>{favoriteProduct.price}</p>

            <img src={isHeartHovered ? "/images/heart_unfilled.png" : "/images/HeartStraight.png"} alt="remove"
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
        is_available: PropTypes.bool.isRequired,
        variant: PropTypes.string.isRequired,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
}

export default FavoriteProduct;
