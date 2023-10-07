import {
  axiosInstances,
  axiosMultipartInstances
} from "../Helpers/axiosWrapper";

const baseURL = process.env.REACT_APP_API_URL;
//sample request
//need call service : {url:'/', method:'post', data:'params'}
function fetchProducts(params) {
  return axiosInstances({
    url: `${baseURL}/store/products`,
    method: "get",
  });
}


function addProduct(data) {
  return axiosInstances({
    url: `${baseURL}/store/addproduct`,
    method: "put",
    data: data
  });
}

function uploadImage(params) {
  return axiosMultipartInstances({
    url: `${baseURL}/files/uploadimage`,
    method: "post",
    data: params,
  });
}



export const API_URLS = {
  fetchProducts,
  uploadImage,
  addProduct
};
