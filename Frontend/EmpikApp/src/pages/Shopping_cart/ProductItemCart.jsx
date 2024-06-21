import "../../styles/shopping_cart.css";
import React, { useEffect, useState } from "react";
import basketService from "../../services/basketService.js";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Checkbox } from "@mui/material";

const ProductItemCart = ({ product, onChange }) => {
    const userState = useSelector((state) => state.user);
    const [quantity, setQuantity] = useState(product.quantity);
    const [addToOrder, setAddToOrder] = useState(product.addToOrder);

    useEffect(() => {}, [quantity]);

    const removeFromCart = async (id) => {
        if (userState.isLoggedIn) {
            const ok = await basketService.removeFromUserBasket(id);
            if (ok) setQuantity(quantity - 1);
            onChange();
        } else {
            basketService.removeFromLocalStorageBasket(id);
            setQuantity(quantity - 1);
            onChange();
        }
    };

    const addToCart = async (id) => {
        if (userState.isLoggedIn) {
            const ok = await basketService.addToUserBasket(id);
            if (ok) setQuantity(quantity + 1);
            onChange();
        } else {
            basketService.addToLocalStorageBasket(id);
            setQuantity(quantity + 1);
            onChange();
        }
    };

    return (
        <div className="product_item_shoping">
            <img src={product.imagePath} className="item" width="150" height="150"/>
            <div className="shopping_info">
                <span className="name_shopping">{product.name}</span>
                <span>{product.producer}</span>
                <div className="shopping_edit">
                    <div className="ilosc_edit">
                        <span>Ilość: {quantity}</span>
                        <button className="edit" onClick={() => addToCart(product.id)}>+</button>
                        <button className="edit" onClick={() => removeFromCart(product.id)}>-</button>
                    </div>
                    <b><span className="cena_shop">Cena: {product.price * quantity} zł</span></b>
                </div>
            </div>
        </div>
    );
};

ProductItemCart.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        producer: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
        variant: PropTypes.string.isRequired,
        addToOrder: PropTypes.bool.isRequired,
        imagePath: PropTypes.string.isRequired,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
};

export default ProductItemCart;
