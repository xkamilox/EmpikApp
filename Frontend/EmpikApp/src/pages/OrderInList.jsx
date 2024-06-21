import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import orderService from "../services/orderService.js";
import "../styles/order.css";

function OrderInList({ order, orderAction }) {
    const [orderProducts, setOrderProducts] = useState([]);

    useEffect(() => {
        const getProductsFromOrder = async () => {
            const products = await orderService.getProductsFromOrder(order.idsAndCountMap);
            console.log(products);
            setOrderProducts(products);
        };
        getProductsFromOrder();
    }, [order.idsAndCountMap]);

    return (
        <div className="order-container">
            <div className="order-info">
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Date:</strong> {order.dateOfOrder}</p>
                <p><strong>Total Price:</strong> {order.totalPrice} zł</p>
                <p><strong>Delivery Address:</strong> {order.deliveryAddress}</p>
            </div>
            {orderProducts.map(product => (
                <div key={product.id} className="product-container">
                    <div className="product-info">
                        <span><strong>{product.name}</strong></span>
                        <span>Producer: {product.producer}</span>
                        <span>Quantity: {order.idsAndCountMap[product.id]}</span>
                    </div>
                    <span className="product-price">
                        Price: {product.price * order.idsAndCountMap[product.id]} zł
                    </span>
                </div>
            ))}
            {order.status === "Waiting for payment" ? (
                <button className="payment-button" onClick={() => orderAction(order.id, order.totalPrice)}>
                    Make payment
                </button>
            ) : (
                <span className="empty-span"></span>
            )}
        </div>
    );
}

OrderInList.propTypes = {
    order: PropTypes.shape({
        id: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
        dateOfOrder: PropTypes.string.isRequired,
        totalPrice: PropTypes.number.isRequired,
        idsAndCountMap: PropTypes.objectOf(PropTypes.number).isRequired,
        userid: PropTypes.number.isRequired,
        deliveryAddress: PropTypes.string.isRequired,
        ordererEmail: PropTypes.string.isRequired,
        ordererName: PropTypes.string.isRequired,
        ordererSurname: PropTypes.string.isRequired,
    }).isRequired,
    orderAction: PropTypes.func.isRequired,
};

export default OrderInList;