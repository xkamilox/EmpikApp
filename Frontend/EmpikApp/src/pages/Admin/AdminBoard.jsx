import React, { useContext} from 'react';
import {Link} from "react-router-dom";
import PATH from "../../paths.jsx";
import { UserContext } from "../../App.jsx";
import { useSelector } from "react-redux";
import { logout } from "../../actions/auth.js";

function AdminBoard() {

    const { userRoleContext, setUserRoleContext } = useContext(UserContext);
    const userState = useSelector((state) => state.user);

    const logOut = () => {
        setUserRoleContext(null);
        dispatch(logout());
    };

    return (
        <div>
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
            <Link to={PATH.ADMIN_ORDERS}>
                <p>Orders</p>
            </Link>
            <Link to={PATH.ADMIN_ADD_PRODUCT}>
                <p>Add product</p>
            </Link>

        </div>
    );

}

export default AdminBoard;
