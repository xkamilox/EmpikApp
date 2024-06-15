import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PATH from "../../paths";
import "../../styles/product.css";
import { logout } from "../../actions/auth.js"
import axiosInstance from "../../interceptors/axiosInstance.jsx";
import { Commet } from "react-loading-indicators";
import basketService from "../../services/basketService.js";
import { UserContext } from "../../App.jsx";

function Product() {
    const { userRoleContext, setUserRoleContext } = useContext(UserContext);
    const userState = useSelector((state) => state.user);
    const [products, setProducts] = useState(null);
    const [category, setCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState(""); // Dodajemy stan do przechowywania wprowadzonego terminu wyszukiwania

    const dispatch = useDispatch();

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        await axiosInstance.get("products")
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.log("Nie pobrano produktów: " + error.response.status);
            });
    };

    const addToCart = (id) => {
        if (userState.isLoggedIn) {
            basketService.addToUserBasket(id);
        } else {
            basketService.addToLocalStorageBasket(id);
        }
    };

    const logOut = () => {
        setUserRoleContext(null);
        dispatch(logout());
    };

    const filterProductsByCategory = (category) => {
        setCategory(category);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className='body_product'>
            <div className='topbar'>
                <img src="/src/images/Product/logo.png" className="logo" />
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
                        {userRoleContext === "admin" ? (<span style={{ color: "white" }}>panelAdmina</span>) : (<span></span>)}
                    </Link>
                </div>
                {userState.isLoggedIn ? (
                    <div className='logout'>
                        <button
                            className='logout-button'
                            onClick={logOut}
                        >Log Out</button>
                    </div>) :
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
                    <input
                        type="text"
                        placeholder="Enter what you are looking for"
                        className='input'
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <img src="/src/images/Product/search.png" className="search" />
                </div>
                    <button className='menu_option_button' onClick={() => filterProductsByCategory('Electronics')}>
                        Electronics
                        <img src="/src/images/Product/right-arrow.png" className="arrow" />
                    </button>
                <button className='menu_option_button' onClick={() => filterProductsByCategory('Fashion')}>
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
                        products
                            .filter(product => !category || product.category === category)
                            .filter(product =>
                                (!searchTerm || product.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                                (!searchTerm || product.producer.toLowerCase().includes(searchTerm.toLowerCase()))
                            )
                            .map((product) => (
                                <div className='product_item' key={product.id}>
                                    <div className='item_img'>
                                        <img src="/src/images/Product/item.png" className="item" />
                                    </div>
                                    <div className='item_text'>
                                        <p>{product.producer + " " + product.name}</p>
                                        <div className='row_item'>
                                            <b><p>{product.price} zł</p></b>
                                            <button className='ADD' onClick={() => addToCart(product.id)}>ADD</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                    ) : (
                        <div>
                            <Commet color="#32cd32" size="medium" text="" textColor="" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Product;
