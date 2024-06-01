import orderService from "../services/orderService.js";
import React, {useEffect, useState} from "react";
import {Commet} from "react-loading-indicators";
import OrderInList from "./OrderInList.jsx";

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

            //setOrders(orders);
        };
        getOrders();
    }, [])


    return (
        orders.length === 0 ? (
            isHistory ? (
                 <div>
                        <span>Twoja historia zamówień jest pusta</span>
                 </div>
            ) : (
                 <div>
                   <Commet color="#32cd32" size="medium" text="" textColor=""/>
                 </div>
                )
        ) : (
            <div>
               {orders.map(order => (
                   <OrderInList key={order.id} order={order} />
               )) }
            </div>)

    )
}

export default OrderHistory;
