import orderService from "../services/orderService.js";
import React, {useEffect, useState} from "react";
import {Commet} from "react-loading-indicators";
import OrderInList from "./OrderInList.jsx";
import axiosInstance from "../interceptors/axiosInstance.jsx";

function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [isHistory, setIsHistory] = useState(false);

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
        orders.length === 0 ? (
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
            </div>)

    )
}

export default OrderHistory;
