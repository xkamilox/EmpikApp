import orderService from "../../services/orderService.js";
import React, {useEffect, useState,useContext} from "react";
import {Commet} from "react-loading-indicators";
import OrderInList from "../OrderInList.jsx";
import axiosInstance from "../../interceptors/axiosInstance.jsx";
import { Link } from "react-router-dom";
import PATH from "../../paths";
import { UserContext } from "../../App.jsx";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/auth.js";

function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [isHistory, setIsHistory] = useState(false);
    const userState = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { userRoleContext, setUserRoleContext } = useContext(UserContext);

    useEffect(() => {
        const getOrders = async() => {
            await orderService.getUserOrders(JSON.parse(localStorage.getItem("auth")).userid)
                .then(response => {
                    setIsHistory(true);
                    setOrders(response.data);
                })

        };
        getOrders();
    }, [])

    const logOut = () => {
        setUserRoleContext(null);
        dispatch(logout());
    };

    const makePayment = async(orderId, totalPrice) => {
        localStorage.setItem("placedOrderId", JSON.stringify(orderId));
        const res = await
            axiosInstance.post("/paypal/init", {}, {params: {sum: totalPrice}});

        const approveUrl = res.data.redirectUrl;
        console.log(approveUrl);
        //navigate(approveUrl); //wyrzuca do logowania
        window.location.href = approveUrl;
    }


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
                {userState.isLoggedIn || userState.isLoggedInGoogle ? (
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
        {orders.length === 0 ? (
            isHistory ? (
                 <div>
                        <span>You don&apos;t have any orders</span>
                 </div>
            ) : (
                 <div>
                   <Commet color="#32cd32" size="medium" text="" textColor=""/>
                 </div>
                )
        ) : (
            <div>
               {orders.map(order => (
                   <OrderInList key={order.id} order={order} orderAction={makePayment}/>
               )) }
            </div>)}
        </div>
    )
}

export default OrderHistory;
