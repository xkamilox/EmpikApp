import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import PATH from "../../paths";
import "../../styles/product.css";
import {useDispatch, useSelector} from "react-redux";
import basketService from "../../services/basketService.js";
import { logout} from "../../actions/auth.js";
import {Commet} from "react-loading-indicators";

function Shopping_cart() {
    const [basket, setBasket] = useState([]);
    const [isBasket, setIsBasket] = useState(false);
    const userState = useSelector(state => state.user);

    const dispatch = useDispatch();



    useEffect( () => {
        //dispatch(getBasket());

       getBasket();
    }, [])


    useEffect( () => {
        //setBasket(basket);
        //setIsBasket(true);
    }, [basket]);


    const getBasket = async() => {
        if(userState.isLoggedIn){
            await basketService.getUserBasket()
                .then( async (data) => {
                    console.log(data);
                    const products = await basketService.getProductsFromBasket(data);
                    setIsBasket(true);
                    setBasket(products);

                }, (error) => {
                    console.log("nie pobralo koszyka" + error.response.status);
                });
        }

        else{   //niezalogowany
            const basket = JSON.parse(localStorage.getItem("basket")).items;
            const products = await basketService.getProductsFromBasket(basket);
            console.log(products);

            setIsBasket(true);
            setBasket(products);

        }
    }


    const removeFromCart = () => {

    };


    const logOut = () => { //przy wylogowaniu currentUser sie jakos sam updateuje i chyba się
        dispatch(logout());      // rerenderuje komponent
    }

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
                {userState.isLoggedIn ? (
                        <div className='logout'>
                          <Link to={PATH.PRODUCT}>
                            <button
                                className='logout-button'
                                onClick={logOut}
                            >Log Out</button>
                          </Link>/
                        </div> ) :
                    (<div className='logout'>
                            <Link to={PATH.LOGIN}>
                                <button className='logout-button'>Login</button>
                            </Link>
                        </div>
                    )}
            </div>
            <div className='container'>
                <div className='products_item'>
                    { basket.length === 0  ? (
                        isBasket ? (
                            <div>
                                <span>Koszyk jest pusty</span>
                            </div>
                            ) : (
                            <div>
                                <Commet color="#32cd32" size="medium" text="" textColor=""/>
                            </div>
                        )
                    ): (
                        basket.map((product) => (
                            <div className='product_item' key={product.id}>
                                <img src="/src/images/Product/item.png" className="item"/>
                                <span>{product.name} </span>
                                <span>{product.producer} </span>
                                <span>{product.price} </span>
                                <span>{product.quantity} </span>
                                <button onClick={removeFromCart}>Remove</button>
                            </div>

                        ))
                    )
                    }
                </div>
            </div>
        </div>
    );
}

export default Shopping_cart;
