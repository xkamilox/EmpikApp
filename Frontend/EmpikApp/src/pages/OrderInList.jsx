import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import orderService from "../services/orderService.js";
import axiosInstance from "../interceptors/axiosInstance.jsx";


function OrderInList({ order, orderAction }) {
    const [orderProducts, setOrderProducts] = useState([]);


    useEffect(() => {
        const getProductsFromOrder = async() => {
            const products = await orderService.getProductsFromOrder(order.idsAndCountMap);
            console.log(products);
            setOrderProducts(products);
        }
        getProductsFromOrder();
    }, []);





    return( //można wyświetlić tez inne dane z orderu
        <div style={{border: "1px solid black"}}>
            <p>{order.id}</p>
            <p>{order.status}</p>
            <p>{order.dateOfOrder}</p>
            <p>{order.totalPrice}</p>
            <p>{order.deliveryAddress}</p>
            {orderProducts.map(product => (
                <div key={product.id}>
                    <span>{product.name + " " + product.variant} </span>
                    <span>{product.producer} </span>
                    <span>Quantity: {order.idsAndCountMap[product.id]} </span>
                    <span>{product.price * order.idsAndCountMap[product.id]} </span>
                </div>
            ))}
            {order.status === "Waiting for payment" ? (
                <button onClick={ () => orderAction(order.id, order.totalPrice) }>Make payment</button>
            ) : (
                <span></span>
            )}
        </div>
    )
}


OrderInList.propTypes = {
    order: PropTypes.shape({
        id: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
        dateOfOrder: PropTypes.string.isRequired,
        totalPrice: PropTypes.number.isRequired,
        idsAndCountMap: PropTypes.shape({
            [PropTypes.string]: PropTypes.number
        }),
        userid: PropTypes.number.isRequired,
        deliveryAddress: PropTypes.string.isRequired,
        ordererEmail: PropTypes.string.isRequired,
        ordererName: PropTypes.string.isRequired,
        ordererSurname: PropTypes.string.isRequired,
    }).isRequired,
    orderAction: PropTypes.func.isRequired,
}


export default OrderInList;
