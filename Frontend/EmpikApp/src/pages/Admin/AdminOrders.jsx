import React, {useEffect, useState,useContext} from "react";
import orderService from "../../services/orderService.js";
import {Commet} from "react-loading-indicators";
import OrderInList from "../OrderInList.jsx";
import { Link } from "react-router-dom";
import PATH from "../../paths";
import { logout } from "../../actions/auth.js";
import { UserContext } from "../../App.jsx";
import { useDispatch, useSelector } from "react-redux";


function AdminOrders() {            //TODO zrobić wyszukanie po id zamowienia
    const [page, setPage] = useState(1);        //do paginacji TODO zrobić wybór ilości pokazywanych i przechodzenie do kolejnej/poprzedniej strony
    const [pageSize, setPageSize] = useState(20);
    const [orders, setOrders] = useState([]);
    const [ordersFetched, setOrdersFetched] = useState(false);
    const { userRoleContext, setUserRoleContext } = useContext(UserContext);
    const userState = useSelector(state => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
        const getOrders = async() => {
            await orderService.getAllOrdersAdmin(page, pageSize)
                .then(response => {
                    setOrders(response.data);
                    setOrdersFetched(true);
                })
        }
        getOrders();
    }, [page, ordersFetched]);


    const markAsPaid = async(orderId, totalPrice) => {  //totalPrice jest nieużywane
        await orderService.setOrderStatus(orderId, "Paid");
        setOrdersFetched(false);    //To jest żeby striggerować refresh komponentu po requescie
    };

    const logOut = () => {
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
            {orders.length === 0 ? (
                ordersFetched ? (
                    <div>
                        <span>There are no orders.</span>
                    </div>
                ) :
                (
                    <div>
                        <Commet color="#32cd32" size="medium" text="" textColor=""/>
                    </div>
                )
            ) :
            (
                <div>
                    {orders.map(order => (
                        <OrderInList key={order.id} order={order} orderAction={markAsPaid}/>
                    ))};
                </div>
            )
            }
        </div>
    )

}

export default AdminOrders;
