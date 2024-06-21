import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PATH from "../../paths";
import "../../styles/product.css";
import { logout } from "../../actions/auth.js";
import axiosInstance from "../../interceptors/axiosInstance.jsx";
import { Commet } from "react-loading-indicators";
import basketService from "../../services/basketService.js";
import { UserContext } from "../../App.jsx";
import FavoriteService from "../../services/favoriteService.js";
import ProductService from "../../services/productService.js";

function Product() {
    const { userRoleContext, setUserRoleContext } = useContext(UserContext);
    const userState = useSelector((state) => state.user);
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [favorites, setFavorites] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10; 

    const dispatch = useDispatch();

    useEffect(() => {
        getProducts();
    }, [])

    useEffect( () => {
        console.log(favorites)
    },[favorites])

    const getProducts = async() => {
         await axiosInstance.get("products")
            .then( (response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.log("Nie pobrano produktów: " + error.response.status);
            });

        if(userState.isLoggedIn){
           await getUserFavorites();
        }
    };

    const getUserFavorites = async () => {
        const favs = await FavoriteService.getUserFavorites();
        console.log(favs);
        setFavorites(favs);
    }

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

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const resetFilters = () => {
        setCategory("");
        setSearchTerm("");
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(products.length / productsPerPage);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    const paginatedProducts = products
        .filter(product => !category || product.category === category)
        .filter(product =>
            (!searchTerm || product.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (!searchTerm || product.producer.toLowerCase().includes(searchTerm.toLowerCase()))
        );

    const row1 = paginatedProducts.slice(indexOfFirstProduct, indexOfFirstProduct + 5);
    const row2 = paginatedProducts.slice(indexOfFirstProduct + 5, indexOfLastProduct);

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
            <div className='container'>
                <div className='menu'>
                    {(category || searchTerm) && (
                        <button className='reset_filters_button' onClick={resetFilters}>
                            Reset Filters
                        </button>
                    )}
                    <div className='body_input'>
                        <input
                            type="text"
                            placeholder="Enter what you are looking for"
                            className='input'
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <img src="/src/images/Product/search.png" className="search" alt="Search" />
                    </div>
                    <button className='menu_option_button' onClick={() => filterProductsByCategory('Electronics')}>
                        Electronics
                        <img src="/src/images/Product/right-arrow.png" className="arrow" alt="Arrow" />
                    </button>
                    <button className='menu_option_button' onClick={() => filterProductsByCategory('Fashion')}>
                        Fashion
                        <img src="/src/images/Product/right-arrow.png" className="arrow" alt="Arrow" />
                    </button>
                    <button className='menu_option_button' onClick={() => filterProductsByCategory('Home')}>
                        Home & Garden
                        <img src="/src/images/Product/right-arrow.png" className="arrow" />
                    </button>
                    <button className='menu_option_button' onClick={() => filterProductsByCategory('Health')}>
                        Health & Beauty
                        <img src="/src/images/Product/right-arrow.png" className="arrow" />
                    </button>
                    <button className='menu_option_button' onClick={() => filterProductsByCategory('Sports')}>
                        Sports & Outdoors
                        <img src="/src/images/Product/right-arrow.png" className="arrow" />
                    </button>
                    <button className='menu_option_button' onClick={() => filterProductsByCategory('Toys')}>
                        Toys & Games
                        <img src="/src/images/Product/right-arrow.png" className="arrow" />
                    </button>
                    <button className='menu_option_button' onClick={() => filterProductsByCategory('Books')}>
                        Books & Magazines
                        <img src="/src/images/Product/right-arrow.png" className="arrow" />
                    </button>
                    <button className='menu_option_button' onClick={() => filterProductsByCategory('Automotive')}>
                        Automotive
                        <img src="/src/images/Product/right-arrow.png" className="arrow" />
                    </button>
                    <button className='menu_option_button' onClick={() => filterProductsByCategory('Food')}>
                        Food & Grocery
                        <img src="/src/images/Product/right-arrow.png" className="arrow" />
                    </button>
                    <button className='menu_option_button' onClick={() => filterProductsByCategory('Pet')}>
                        Pet Supplies
                        <img src="/src/images/Product/right-arrow.png" className="arrow" />
                    </button>
                    <button className='menu_option_button' onClick={() => filterProductsByCategory('Arts')}>
                        Arts & Crafts
                        <img src="/src/images/Product/right-arrow.png" className="arrow" />
                    </button>
                </div>
                <div className='products_item'>
                    {row1.length > 0 && (
                        <div className='roww'>
                            {row1.map(product => (
                                <div className='product_item' key={product.id}>
                                    <div className='item_img'>
                                        <img src={product.imagePath} alt={product.name} width="150" height="150"/>
                                    </div>
                                    <div className='item_text'>
                                        <p>{product.producer + " " + product.name}</p>
                                        <div className='row_item'>
                                            <b><p>{product.price} zł</p></b>
                                            <button className='ADD' onClick={() => addToCart(product.id)}>ADD</button>
                                            <img src="/images/heart_unfilled.png"
                                                alt="add to favorites"
                                                onClick={() => FavoriteService.addProductToFavorites(product.id)}
                                                width="35"
                                                height="35"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {row2.length > 0 && (
                        <div className='roww'>
                            {row2.map(product => (
                                <div className='product_item' key={product.id}>
                                    <div className='item_img'>
                                        <img src={product.imagePath} alt={product.name} width="150" height="150"/>
                                    </div>
                                    <div className='item_text'>
                                        <p>{product.producer + " " + product.name}</p>
                                        <div className='row_item'>
                                            <b><p>{product.price} zł</p></b>
                                            <button className='ADD' onClick={() => addToCart(product.id)}>ADD</button>
                                            <img src="/images/heart_unfilled.png"
                                                alt="add to favorites"
                                                onClick={() => FavoriteService.addProductToFavorites(product.id)}
                                                width="35"
                                                height="35"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {!row1.length && !row2.length && (
                        <div>
                            <Commet color="#32cd32" size="medium" text="" textColor="" />
                        </div>
                    )}
                    <div>
                        {totalPages > 1 && (
                            <ul className='pagination'>
                                {Array.from({ length: totalPages }).map((_, index) => (
                                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                        <button onClick={() => paginate(index + 1)} className='page-link'>
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;