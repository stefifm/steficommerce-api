import { createContext, useContext, useReducer, useEffect } from "react";
import { initialState, cartReducer, initCart } from "../reducer/cartReducer";
import { CartActions } from "../actions/cartActions";

const CartContext = createContext(initialState);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart must be defined within a CartProvider");
  return context;
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, initCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state))
  }, [state]);

  const appendItemCart = (item, increment = 1) => {
    dispatch({ 
      type: CartActions.APPEND_ITEM_CART, 
      payload: {
        item,
        increment: parseInt(increment),
      } });
  };

  const removeItemCart = (item) => {
    dispatch({ type: CartActions.REMOVE_ITEM_CART, payload: item });
  };

  const clearCart = () => {
    dispatch({ type: CartActions.CLEAR_ITEM_CART });
  };

  const decreaseItemCart = (item, decrease = 1) => {
    dispatch({ 
      type: CartActions.DECREASE_ITEM_CART, 
      payload: {
        item,
        decrease: parseInt(decrease) ,
      } });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        appendItemCart,
        removeItemCart,
        clearCart,
        decreaseItemCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
