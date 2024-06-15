import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import PATH from "../../paths.jsx";
import FavoriteService from "../../services/favoriteService.js";
import {Commet} from "react-loading-indicators";
import FavoriteProduct from "./FavoriteProduct.jsx";

import {UserContext} from "../../App.jsx";
import {useDispatch, useSelector} from "react-redux";


export default function Profile() {
    const {userRoleContext, setUserRoleContext} = useContext(UserContext);
    const userState = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [favorites, setFavorites] = useState([]);
    const [isFavorites, setIsFavorites] = useState(false);
    const [isChanged, setIsChanged] = useState(false);

    useEffect( () => {
        const getFavorites = async() => {
            const response = await FavoriteService.getUserFavorites();
            setFavorites(response);
        }
        getFavorites();
    }, [isChanged])


    const onChange = () => {
        setIsChanged(!isChanged);
    }

    const logOut = () => { //przy wylogowaniu currentUser sie jakos sam updateuje i chyba się
        setUserRoleContext(null);
        dispatch(logOut());      // rerenderuje komponent
    }

    return(
        <div>

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
                    <Link to={PATH.ADMIN_BOARD}>
                        {userRoleContext === "admin" ? (<span style={{color: "white"}}>panelAdmina</span>) : (
                            <span></span>)}
                    </Link>
                </div>
                {userState.isLoggedIn ? (
                        <div className='logout'>
                            <button
                                className='logout-button'
                                onClick={logOut}
                            >Log Out
                            </button>
                        </div>) :
                    (<div className='logout'>
                            <Link to={PATH.LOGIN}>
                                <button className='logout-button'>Login</button>
                            </Link>
                        </div>
                    )}
            </div>

            <button>Dane profilu</button>
            <Link to={PATH.ORDER_HISTORY}>
                <button>Historia zamówień</button>
            </Link>

            {
                favorites.length === 0 ? (
                        isFavorites ? (
                                <div>
                                    Nie masz ulubionych
                                </div>
                            ) :
                            (
                                <div>
                                    <Commet color="#32cd32" size="medium" text="" textColor=""/>
                                </div>
                            )
                    ) :
                    (
                        favorites.map(favoriteProduct => (
                            <FavoriteProduct key={favoriteProduct.id} favoriteProduct={favoriteProduct}
                                             onChange={onChange}/>
                        ))
                    )
            }


        </div>
    );
}
