import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import PATH from "../../paths";
import "../../styles/product.css";
import { logout } from "../../actions/auth.js"
import axiosInstance from "../../interceptors/axiosInstance.jsx";
import {Commet} from "react-loading-indicators";
import basketService from "../../services/basketService.js";


function Product() {
    const userState = useSelector((state) => state.user); //na podstawie tego czy uzytkownik jest zalogowany będzie zawartość strony
    const productName = "Shoes";
    const productPrice = "5 zł";
    const [products, setProducts] = useState(null);
    const [category, setCategory] = useState("");

    const dispatch = useDispatch();

    useEffect( () => {
        getProducts();
    }, [])

    const getProducts = async() => {
         await axiosInstance.get("products")
            .then( (response) => {
                setProducts(response.data);
                console.log(response.data);
            }, (error) => {
                console.log("nie pobralo p[roduktow" + error.response.status);
            });
    }

    /*const handleMoveToBasket = () => {
        dispatch(getBasket());
    }*/

    const addToCart = (id) => {
        if(userState.isLoggedIn){
            basketService.addToUserBasket(id);
        }
        else {
            basketService.addToLocalStorageBasket(id);
        }
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
                    <button className='product' /*onClick={handleMoveToBasket}*/>Shopping cart</button>
                </Link>
                <Link to={PATH.PROFILE}>
                    <button className='product'>Profile</button>
                </Link>
            </div>
            {userState.isLoggedIn ? (
                <div className='logout'>
                    {/*/ <Link to={PATH.LOGIN}>/*/}
                        <button
                            className='logout-button'
                            onClick={logOut}
                        >Log Out</button>
                        {/*/</Link>/*/}
                </div> ) :
                (<div className='logout'>
                     <Link to={PATH.LOGIN}>
                        <button className='logout-button'>Login</button>
                    </Link>
                </div>
            )}
        </div>
        <div className='container'>
            <div className='menu'>
                <div className='body_input'>
                    <input type="text" placeholder="Enter what you are looking for" className='input'/>
                    <img src="/src/images/Product/search.png" className="search"/>
                </div>
                <button className='menu_option_button'>
                    Electronics
                    <img src="/src/images/Product/right-arrow.png" className="arrow" />
                </button>
                <button className='menu_option_button'>
                    Fashion
                    <img src="/src/images/Product/right-arrow.png" className="arrow" />    
                </button>
                <button className='menu_option_button'>
                    Home & Garden
                    <img src="/src/images/Product/right-arrow.png" className="arrow" />
                </button>
                <button className='menu_option_button'>
                    Health & Beauty
                    <img src="/src/images/Product/right-arrow.png" className="arrow" />
                </button>
                <button className='menu_option_button'>
                    Sports & Outdoors
                    <img src="/src/images/Product/right-arrow.png" className="arrow" />
                </button>
                <button className='menu_option_button'>
                    Toys & Games
                    <img src="/src/images/Product/right-arrow.png" className="arrow" />
                </button>
                <button className='menu_option_button'>
                    Books & Magazines
                    <img src="/src/images/Product/right-arrow.png" className="arrow" />
                </button>
                <button className='menu_option_button'>
                    Automotive
                    <img src="/src/images/Product/right-arrow.png" className="arrow" />
                </button>
                <button className='menu_option_button'>
                    Food & Grocery
                    <img src="/src/images/Product/right-arrow.png" className="arrow" />
                </button>
                <button className='menu_option_button'>
                    Pet Supplies
                    <img src="/src/images/Product/right-arrow.png" className="arrow" />
                </button>
                <button className='menu_option_button'>
                    Arts & Crafts
                    <img src="/src/images/Product/right-arrow.png" className="arrow" />
                </button>
            </div>
            <div className='products_item'>
                {products ? (
                    products.map((product) => (
                        <div className='product_item' key={product.id}>
                            <img src="/src/images/Product/item.png" className="item"/>
                            <p>{product.name}</p>
                            <p>{product.price}</p>
                            <button onClick={ () => {addToCart(product.id)} }>ADD</button>
                        </div>
                    ))
                 ) : ( <div>
                        <Commet color="#32cd32" size="medium" text="" textColor=""/>
                       </div>
                     )
                }
            </div>
        </div>
    </div>
  );
}

export default Product;
