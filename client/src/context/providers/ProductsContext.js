import { createContext, useEffect, useReducer } from "react";
import { getProducts } from "../../api/productsApi";
import { productReducer, initialState } from "../reducer/productReducer";
import { productActions } from "../actions/productsActions";

export const ProductContext = createContext(initialState);

export const ProductProovider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  const loadProducts = async () => {
    dispatch({ type: productActions.LOAD_PRODUCTS });
    const res = await getProducts();
    if (res.data) {
      dispatch({
        type: productActions.LOAD_PRODUCTS_SUCCESS,
        payload: res.data,
      });
    }
  };
  useEffect(() => {
    loadProducts();
  }, []);
  return (
    <ProductContext.Provider value={{ ...state, getProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
