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


const addToUserBasket = (id) => { //wysyla posta by zaaktualizowac basket w bazie danych
  console.log("wysylam posta do basket");
  axiosInstance.post("/basket", {operationName: "AddOrRemoveFromBasket",
                                          productId: id,
                                          count: 1}
  );

}


const getUserBasket = () => {
  const userid = store.getState().user.user.id;
  return axiosInstance.get("/basket",
                          { params: { userid: userid }
                                 }
  ).then( (response) => {
        if(response.data) {
          return response.data;
        }
      }, (error) => {
        return error.messages;
    }
    );
}


/*const getProductsFromBasket = (basket) => {
  const products = [];

  basket.forEach( async (product) => {
    await axiosInstance.get(`/products/${product.product_id}`)
      .then( (response) => {
        products.push( {...response.data, quantity: product.count} );
      })
  });

  return products;
}*/


const getProductsFromBasket = async (basket) => {
  return await Promise.all(
    basket.map(async (item) => {
      const response = await axiosInstance.get(`/products/${item.product_id}`);
      return {...response.data, quantity: item.count};
    })
  );
};

export default {
  addToLocalStorageBasket,
  addToUserBasket,
  getUserBasket,
  getProductsFromBasket,
}
