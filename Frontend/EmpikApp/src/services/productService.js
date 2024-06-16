
/*const convertImageFromByteArray = (products) => {
  try {
    return products.map(product => {
      if(product.image) {
        let result = Array.from(product.image, char => char.charCodeAt(0));
        console.log(result);
        let base64Image = byteArrayToBase64(result);
        return {
          ...product,
          imageSrc: 'data:image/png;base64,' + base64Image,
        };
      }else {
        return {
          ...product,
          imageSrc: null,
        };
      }
    });
  }catch(error){
    console.log("error w przetw", error.message);
  }
}*/


const convertImageFromByteArray = (products) => {
  try {
    return products.map(product => {
      if (product.image) {
        let byteArray = stringToByteArray(product.image);
        let base64Image = byteArrayToBase64(byteArray);
        return {
          ...product,
          imageSrc: 'data:image/png;base64,' + base64Image,
        };
      } else {
        return {
          ...product,
          imageSrc: null,
        };
      }
    });
  } catch (error) {
    console.log("Error processing images:", error.message);
  }
}


const byteArrayToBase64 = (byteArray) => {
  let binary = '';
  let len = byteArray.byteLength; console.log("len: ", len);
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(byteArray[i]);
  }
  return window.btoa(binary);
}

const stringToByteArray = (str) => {
  let byteArray = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    byteArray[i] = str.charCodeAt(i);
  }
  return byteArray;
}


export default {
  convertImageFromByteArray,
}
