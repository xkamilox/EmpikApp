import React, { useEffect, useState,useContext } from 'react';
import { Link } from "react-router-dom";
import PATH from "../../paths";
import "../../styles/shopping_cart.css";
import { useDispatch, useSelector } from "react-redux";
import basketService from "../../services/basketService.js";
import { logout } from "../../actions/auth.js";
import { Commet } from "react-loading-indicators";
import ProductItemCart from "./ProductItemCart.jsx";
import { UserContext } from "../../App.jsx";
import { setReduxBasket } from "../../actions/basket.js";

function Shopping_cart() {
    const [basket, setBasket] = useState([]);
    const [isBasket, setIsBasket] = useState(false);
    const [basketChanged, setBasketChanged] = useState(true);
    const [basketPrice, setBasketPrice] = useState(0);
    const userState = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { userRoleContext, setUserRoleContext } = useContext(UserContext);


    useEffect(() => {
        getBasket();
    }, [basketChanged]);

    const getBasket = async () => {
        if (userState.isLoggedIn) {
            await basketService.getUserBasket()
                .then(async (data) => {
                    const products = await basketService.getProductsFromBasket(data);
                    setBasket(products);
                    setBasketPrice(calculateBasketPrice(products));
                    setIsBasket(true);
                    dispatch(setReduxBasket(products, calculateBasketPrice(products)));
                }, (error) => {
                    console.log("nie pobralo koszyka" + error.response.status);
                });
        } else { //niezalogowany
            const basket = JSON.parse(localStorage.getItem("basket")).items;
            const products = await basketService.getProductsFromBasket(basket);
            setBasket(products);
            setBasketPrice(calculateBasketPrice(products));
            setIsBasket(true);
            dispatch(setReduxBasket(products, calculateBasketPrice(products)));
        }
    };

    const calculateBasketPrice = (products) => {
        return products.reduce((total, product) => {
            return product.addToOrder && product.available ? total + (product.price * product.quantity) : total;
        }, 0);
    };

    const onChange = (productId, addToOrder, priceChange) => {
        const updatedBasket = basket.map((item) => {
            if (item.id === productId) {
                item.addToOrder = addToOrder;
            }
            return item;
        });

        const newPrice = calculateBasketPrice(updatedBasket);

        setBasket(updatedBasket);
        setBasketPrice(newPrice);
        setBasketChanged(!basketChanged);
    };

    const logOut = () => {
        dispatch(logout());
    };

    return (
        <div className='body_product'>
            <div className='topbar5'>
                <img src="/src/images/Product/logo.png" className="logo" alt="Logo" />
                <div className='topbar-right'>
                    <Link to={PATH.PRODUCT}>
                        <button className='product'>Products</button>
                    </Link>
                    <Link to={PATH.SHOPPING_CART}>
                        <button className='product'>Shopping cart</button>
                    </Link>
                    <Link to={PATH.PROFILE}>
                        <button className='product'>Profile</button>
                    </Link>
                    <Link to={PATH.ADMIN_BOARD}>
                    {userRoleContext === "admin" ? (
                        <button className='product'>Panel Admina</button>
                    ) : (
                        <span></span>
                    )}
                    </Link>
                </div>
                {userState.isLoggedIn ? (
                    <div className={userRoleContext === "admin" ? 'logout admin-logout' : 'logout'}>
                        <button
                            className='logout-button'
                            onClick={logOut}
                        >Log Out</button>
                    </div>
                ) : (
                    <div className='logout'>
                        <Link to={PATH.LOGIN}>
                            <button className='logout-button'>Login</button>
                        </Link>
                    </div>
                )}
            </div>
            <div className='container2'>
                <div className='products_item2'>
                    {basket.length === 0 ? (
                        isBasket ? (
                            <div>
                                <span>Koszyk jest pusty</span>
                            </div>
                        ) : (
                            <div>
                                <Commet color="#32cd32" size="medium" text="" textColor="" />
                            </div>
                        )
                    ) : (
                        basket.map((product) => (
                            <ProductItemCart key={product.id} product={product} onChange={onChange} />
                        ))
                    )}
                    <div>
                        <div className='cena_calkowita'>
                            <div>
                                <b><span>Cena całkowita: {basketPrice} zł</span></b>
                            </div>
                            <Link to={PATH.SHOPPING_CART_INFO}>
                                <button className='product2'>KUP</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Shopping_cart;
