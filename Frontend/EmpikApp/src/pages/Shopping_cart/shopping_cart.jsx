import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import PATH from "../../paths";
import "../../styles/product.css";
import {useDispatch, useSelector} from "react-redux";
import basketService from "../../services/basketService.js";
import { logout} from "../../actions/auth.js";
import {Commet} from "react-loading-indicators";
import axiosInstance from "../../interceptors/axiosInstance.jsx";
import ProductItemCart from "./ProductItemCart.jsx";

function Shopping_cart() {
    const [basket, setBasket] = useState([]);
    const [isBasket, setIsBasket] = useState(false);
    const [basketChanged, setBasketChanged] = useState(true);
    const [basketPrice, setBasketPrice] = useState(0);
    const userState = useSelector(state => state.user);

    const dispatch = useDispatch();



    useEffect( () => {
        //dispatch(getBasket());

       getBasket();
    }, [basketChanged])



    const getBasket = async() => {
        if(userState.isLoggedIn){
            await basketService.getUserBasket()
                .then( async (data) => {
                    console.log(data);
                    const products = await basketService.getProductsFromBasket(data);
                    console.log(products);
                    setBasketPrice(basketService.calculateBasketPrice(products));
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
            setBasketPrice(basketService.calculateBasketPrice(products));
            setIsBasket(true);
            setBasket(products);

        }
    }


    const onChange = () => {
        setBasketChanged(!basketChanged);
    }



    const pay = async() => {
        const res = await
        axiosInstance.post("/paypal/init", {}, {params: {sum: basketPrice}});

        const approveUrl = res.data.redirectUrl;
        console.log(approveUrl);
        window.location.href = approveUrl;
    }


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
                             <ProductItemCart key={product.id} product={product} onChange={onChange} />
                        ))

                    )
                   }
                <div>
                    <div>
                        <span>Cena calkowita: {basketPrice}</span>
                    </div>
                    <button onClick={pay}>
                        KUP
                    </button>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Shopping_cart;
