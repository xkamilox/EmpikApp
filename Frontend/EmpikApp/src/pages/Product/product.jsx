import React from 'react';
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import PATH from "../../paths";
import "../../styles/product.css";
import { logout } from "../../actions/auth.js"

function Product() {
    const {user: currentUser} = useSelector((state) => state.auth); //na podstawie tego czy uzytkownik jest zalogowany będzie zawartość strony
    const productName = "Shoes";
    const productPrice = "5 zł";

    const addToCart = () => {
        localStorage.setItem('productName', productName);
        localStorage.setItem('productPrice', productPrice);
    };

    const dispatch = useDispatch();

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
                <Link to={PATH.PROFILE}>
                    <button className='product'>Profile</button>
                </Link>
            </div>
            {currentUser ? (
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
                <div className='product_item'>
                    <img src="/src/images/Product/item.png" className="item" />
                    <p>Shoes</p>
                    <p>5 zł</p>
                    <button onClick={addToCart}>ADD</button>
                </div>
            </div>
        </div>
    </div>
  );
}
export default Product;
