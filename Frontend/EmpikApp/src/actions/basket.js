

export const setReduxBasket = (products, price) => (dispatch) => {
  dispatch({
    type: "basket/setBasket",
    payload: {
      products: products,
      price: price,
    }
  });
};
