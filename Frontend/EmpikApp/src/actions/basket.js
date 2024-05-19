import basketService from "../services/basketService.js";

export const getBasket = () => (dispatch) => {
  return basketService.getUserBasket()
    .then( (data) => {
      dispatch({
        type: "basket/setBasket",
        payload: data,
      });
    return Promise.resolve();
    }
    );
};
