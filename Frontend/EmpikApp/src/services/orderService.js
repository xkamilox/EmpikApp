import axiosInstance from "../interceptors/axiosInstance.jsx";


const getProductIdsFromBasket = (basket) => {
  let productIds =[];

  basket.products.forEach((product) => {
    for(let i=0; i<product.quantity; i++) {
      productIds.push(product.id);
    }
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

const getUserOrders = async(userId) => {
  return axiosInstance.get(`/userorders/${userId}`);
}

const getProductsFromOrder = async(idsAndCountMap) => {
    return await Promise.all(
      Object.keys(idsAndCountMap).map( async(key) => {
          return await axiosInstance.get(`/products/${key}`)
            .then(response => {
              return response.data;
            });
        })
      );
}


export default {sendCreateOrderRequest, getUserOrders, getProductsFromOrder};
