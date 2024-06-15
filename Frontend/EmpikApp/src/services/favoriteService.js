import axiosInstance from "../interceptors/axiosInstance.jsx";



const getUserFavorites = async() => {
  return await axiosInstance.get("/favorites")
    .then(response => {
      //console.log(response.data);
      return response.data;
    });
}

const isProductInFavorites = (productId, favorites) => {
  favorites.forEach(favorite => {
    if(favorite.id === productId){
      console.log("jset w ulu");
      return true;
    }
  });
  return false;
}

const removeProductFromFavorites = async(productId) => {
  await axiosInstance.delete("/favorites", {
    params: {
      productId: productId,
    }
  });
}


const addProductToFavorites = async(productId) => {
  await axiosInstance.post("/favorites", null, {
    params: {
      productId: productId,
    }
  });
}

export default {
  getUserFavorites,
  isProductInFavorites,
  removeProductFromFavorites,
  addProductToFavorites
};
