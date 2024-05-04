import React from 'react';
import { Link } from "react-router-dom";
import PATH from "../../paths";
import "../../styles/product.css";

function Shopping_cart() {
    const productName = localStorage.getItem('productName');
    const productPrice = localStorage.getItem('productPrice');

    const removeFromCart = () => {
        localStorage.removeItem('productName');
        localStorage.removeItem('productPrice');
    };

    return (
        <div className='body_product'>
            <div className='topbar'>
                <img src="/src/images/Product/logo.png" className="logo"/>
                <div className='topbar-right'>
                    <Link to={PATH.PRODUCT}>
                        <button className='product'>Products</button>
                    </Link>
                    <Link to={PATH.SHOPPING_CART}>
                        <button className='product'>Shopping cart</button>
                    </Link>
                </div>
                <div className='logout'>
                    <Link to={PATH.LOGIN}>
                        <button className='logout-button'>Log Out</button>
                    </Link>
                </div>
            </div>
            <div className='container'>
                <div className='products_item'>
                    <div className='product_item'>
                        {/* <img src="/src/images/Product/item.png" className="item" /> */}
                        <span>{productName}</span>
                        <span>{productPrice}</span>
                        <button onClick={removeFromCart}>Remove</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Shopping_cart;
