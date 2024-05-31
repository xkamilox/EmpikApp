import axiosInstance from "../interceptors/axiosInstance.jsx";


const getProductIdsFromBasket = (basket) => {
  let productIds =[];

  basket.products.forEach((product) => {
    productIds.push(product.id);
  });

  return productIds;
}


const sendCreateOrderRequest = async(orderData) => {
  const productIds = getProductIdsFromBasket(orderData.basket);

  const userid = JSON.parse(localStorage.getItem("auth"))?.userid;

  return await axiosInstance.post("/orders", {
    userId: userid,
    email: orderData.email,
    name: orderData.name,
    surname: orderData.surname,
    orderedItemsIds: productIds,
    totalPrice: orderData.basket.price,
    deliveryAddress: orderData.deliveryAddress
  });
}


export default {sendCreateOrderRequest};
