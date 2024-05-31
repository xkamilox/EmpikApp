import basketService from "../services/basketService.js";

/*export const getBasketDispatch = () => (dispatch) => {
  return basketService.getUserBasket()
    .then( (data) => {
      dispatch({
        type: "basket/setBasket",
        payload: data,
      });
    return Promise.resolve();
    }
    );
};*/

export const setReduxBasket = (products, price) => (dispatch) => {
  dispatch({
    type: "basket/setBasket",
    payload: {
      products: products,
      price: price,
    }
  });
};
