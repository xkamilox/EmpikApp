import axiosInstance from "../interceptors/axiosInstance.jsx";
import store from "../store.js";


const addToLocalStorageBasket = (id) => {
  const basket = JSON.parse(localStorage.getItem("basket"));
  if(basket){ //jest juz koszyk
    const itemIndex = basket.items.findIndex(item => item.product_id === id);
    if(itemIndex !== -1){   //czy jest juz o takim product_id w koszyku
      basket.items[itemIndex].count += 1;
    }
    else {  //Nie ma produktu o takim product_id
      basket.items.push({product_id: id, count: 1});
    }
    localStorage.setItem("basket", JSON.stringify(basket));
  }
  else {  //Nie ma koszyka
    let basket = {
      items: []
    };
    basket.items.push({product_id: id, count: 1})
    localStorage.setItem("basket", JSON.stringify(basket));
  }
}

const removeFromLocalStorageBasket = (id) => {
  const basket = JSON.parse(localStorage.getItem("basket"));

  const itemIndex = basket.items.findIndex(item => item.product_id === id);
  basket.items[itemIndex].count -= 1;
}


const addToUserBasket = async(id) => { //wysyla posta by zaaktualizowac basket w bazie danych
  console.log("wysylam posta do basket");
  const ok =  await axiosInstance.post("/basket", {operationName: "AddOrRemoveFromBasket",
                                          productId: id,
                                          count: 1}
  );
  if(ok.data){ return true; } else return false;
}

const removeFromUserBasket = async(id) => { //wysyla posta by zaaktualizowac basket w bazie danych
  console.log("wysylam posta do basket");
  const ok = await axiosInstance.post("/basket", {operationName: "AddOrRemoveFromBasket",
    productId: id,
    count: -1}
  );
  if(ok.data){ return true; } else return false;
}

const clearUserBasket = async() => {
  await axiosInstance.delete("/basket");
  store.dispatch({type: "basket/clearBasket"});
}

const clearNotLoggedInBasket = () => {
  localStorage.removeItem(("basket"));
  store.dispatch({type: "basket/clearBasket"});
}


const getUserBasket = () => {
  return axiosInstance.get("/basket")
    .then( (response) => {
        if(response.data) {
          return response.data;
        }
      }, (error) => {
        return error.messages;
    }
    );
}



const getProductsFromBasket = async (basket) => {
  return await Promise.all(
    basket.map(async (item) => {
      const response = await axiosInstance.get(`/products/${item.product_id}`);
      return {...response.data, quantity: item.count, addToOrder: true};
    })
  );
};


const calculateBasketPrice = (products) => {
  let price = 0;

  products.map(item => {
    price += (item.price * item.quantity);
  });
  console.log(price);
  return price;
}

export default {
  addToLocalStorageBasket,
  addToUserBasket,
  getUserBasket,
  getProductsFromBasket,
  removeFromUserBasket,
  clearUserBasket,
  clearNotLoggedInBasket,
  removeFromLocalStorageBasket,
  calculateBasketPrice
}
