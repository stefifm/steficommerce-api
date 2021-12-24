import axios from "axios";

const API = process.env.REACT_APP_API || "";

export const getProducts = async () => await axios.get(`${API}/products`);

const productsAxios = axios.create({
  baseUrl: `${API}`,
});

productsAxios.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `${localStorage.getItem("token")}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export const saveProduct = async (newProduct) =>
  productsAxios.post(`${API}/products`, newProduct);

export const deleteProduct = async (id) => {
  return await productsAxios.delete(`${API}/products/${id}`);
};

export const updateProduct = async (id, product) => {
  return await productsAxios.put(`${API}/products/${id}`, product);
};
