import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import orderService from "../services/orderService.js";
import axiosInstance from "../interceptors/axiosInstance.jsx";


function OrderInList({ order }) {
    const [orderProducts, setOrderProducts] = useState([]);


    useEffect(() => {
        const getProductsFromOrder = async() => {
            const products = await orderService.getProductsFromOrder(order.idsAndCountMap);
            console.log(products);
            setOrderProducts(products);
        }
        getProductsFromOrder();
    }, []);


    const makePayment = async() => {
        localStorage.setItem("placedOrderId", JSON.stringify(order.id));
        const res = await
            axiosInstance.post("/paypal/init", {}, {params: {sum: order.totalPrice}});

        const approveUrl = res.data.redirectUrl;
        console.log(approveUrl);
        //navigate(approveUrl); //wyrzuca do logowania
        window.location.href = approveUrl;
    }


    return(
        <div style={{border: "1px solid black"}}>
            <p>{order.id}</p>
            <p>{order.status}</p>
            <p>{order.dateOfOrder}</p>
            <p>{order.totalPrice}</p>
            {orderProducts.map(product => (
                <div key={product.id}>
                    <span>{product.name + " " + product.variant} </span>
                    <span>{product.producer} </span>
                    <span>Ilość: {order.idsAndCountMap[product.id]} </span>
                    <span>{product.price * order.idsAndCountMap[product.id]} </span>
                </div>
            ))}
            {order.status === "Waiting for payment" ? (
                <button onClick={makePayment}>Make payment</button>
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
        })
    })
}


export default OrderInList;
