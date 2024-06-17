import React, {useContext, useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import PATH from "../../paths";
import "../../styles/product.css";
import { logout } from "../../actions/auth.js"
import axiosInstance from "../../interceptors/axiosInstance.jsx";
import {Commet} from "react-loading-indicators";
import basketService from "../../services/basketService.js";
import {UserContext} from "../../App.jsx";
import FavoriteService from "../../services/favoriteService.js";
import ProductService from "../../services/productService.js";


function Product() {
    const {userRoleContext, setUserRoleContext} = useContext(UserContext);
    const userState = useSelector((state) => state.user); //na podstawie tego czy uzytkownik jest zalogowany będzie zawartość strony
    const [products, setProducts] = useState(null);
    const [category, setCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState(""); // Dodajemy stan do przechowywania wprowadzonego terminu wyszukiwania
    const [favorites, setFavorites] = useState([]);

    const dispatch = useDispatch();

    useEffect( () => {
        getProducts();
    }, [])

    useEffect( () => {
        console.log(favorites)
    },[favorites])

    const getProducts = async() => {
         await axiosInstance.get("products")
            .then( (response) => {
                //const prodsImgs = ProductService.convertImageFromByteArray(response.data);
                //console.log(prodsImgs);
                setProducts(response.data);
                //setProducts(prodsImgs);
            })
            .catch((error) => {
                console.log("Nie pobrano produktów: " + error.response.status);
            });

        if(userState.isLoggedIn){
           await getUserFavorites();
        }
    };

    const getUserFavorites = async() => {
        const favs = await FavoriteService.getUserFavorites();
        console.log(favs);
        setFavorites(favs);
        console.log(favorites)
    }

    const addToCart = (id) => {
        if(userState.isLoggedIn){
            basketService.addToUserBasket(id);
        }
        else {
            basketService.addToLocalStorageBasket(id);
        }
    };

/*    const isProductInFavorites = (productId) => {
        console.log("w czy jest: ", favorites);
        return FavoriteService.isProductInFavorites(productId, favorites);
    }*/


/*    const removeFromFavorites = async(productId) => {
        await axiosInstance.delete("/favorites", {
            params: {
                productId: productId,
            }
        });
    }*/


    const logOut = () => { //przy wylogowaniu currentUser sie jakos sam updateuje i chyba się
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
                                        <img src={product.imageSrc ? product.imageSrc : "/src/images/Product/item.png"} className="item"  alt={product.name}/>
                                    </div>
                                    <div className='item_text'>
                                        <p>{product.producer + " " + product.name}</p>
                                        <div className='row_item'>
                                            <b><p>{product.price} zł</p></b>
                                            <button className='ADD' onClick={() => addToCart(product.id)}>ADD</button>
                                            {/*<img src={isProductInFavorites(product.id, favorites) ? "/images/HeartStraight.png" : "/images/heart_unfilled.png"}*/}
                                            <img src="/images/heart_unfilled.png"
                                                 alt="add to favorites"
                                                 onClick={() => FavoriteService.addProductToFavorites(product.id)}
                                                /*onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}*/
                                                 width="35"
                                                 height="35"
                                            />
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
