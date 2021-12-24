import { productActions } from "../actions/productsActions";

export const initialState = {
  isLoading: false,
  products: [],
  errorMessage: "",
  
};

export const productReducer = (state, actions) => {
  const { type, payload } = actions;
  switch (type) {
    case productActions.LOAD_PRODUCTS:
      return {
        ...state,
        isLoading: true,
      };
    case productActions.LOAD_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: payload,
      };
    case productActions.LOAD_PRODUCTS_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
      };
    case productActions.LOAD_SAVE_PRODUCT:
      return {
        ...state,
        isLoading: true,
      };
    case productActions.LOAD_SAVE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: [...state.products, payload],
      };
    case productActions.LOAD_SAVE_PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
      };
    case productActions.ADD_PRODUCT_CART:
      return {
        ...state,
        cart: [...state.cart, payload]
      }
    case productActions.REMOVE_PRODUCT:
      return {
        ...state,
        isLoading: true,
      }
    case productActions.REMOVE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.filter((product) => product._id !== payload),
        isLoading: false
      }
    case productActions.REMOVE_PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload
      }
      default:
      return state;
  }
};
