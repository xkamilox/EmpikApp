import React, {useEffect, useState} from "react";
import orderService from "../../services/orderService.js";
import {Commet} from "react-loading-indicators";
import OrderInList from "../OrderInList.jsx";


function AdminOrders() {            //TODO zrobić wyszukanie po id zamowienia
    const [page, setPage] = useState(1);        //do paginacji TODO zrobić wybór ilości pokazywanych i przechodzenie do kolejnej/poprzedniej strony
    const [pageSize, setPageSize] = useState(20);
    const [orders, setOrders] = useState([]);
    const [ordersFetched, setOrdersFetched] = useState(false);

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


    return (
        <div>
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
