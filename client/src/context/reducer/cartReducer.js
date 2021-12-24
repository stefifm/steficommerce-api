import { CartActions } from "../actions/cartActions";

export const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

export const initCart = (initState = initialState) => JSON.parse(localStorage.getItem("cart")) || initState

export const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CartActions.APPEND_ITEM_CART: {
      const newItems = state.items.find((item) => item._id === payload.item._id)
        ? state.items.map((item) =>
            item._id === payload.item._id
              ? { ...item, quantity: item.quantity + payload.increment }
              : item
          )
        : [...state.items, { ...payload.item, quantity: 1 }];

      const totalPrice = newItems.reduce(
        (total, { price, quantity }) => total + price * quantity,
        0
      );

      return {
        ...state,
        items: newItems,
        totalItems: state.totalItems + payload.increment,
        totalPrice,
      };
    }

    case CartActions.REMOVE_ITEM_CART: {
      const itemFound = state.items.find((item) => item._id === payload._id);
      const items = state.items.filter((item) => item._id !== payload._id);
      const totalPrice = items.reduce(
        (total, { price, quantity }) => total + price * quantity,
        0
      );
      return {
        ...state,
        items,
        totalItems: state.totalItems - itemFound.quantity,
        totalPrice,
      };
    }

    case CartActions.DECREASE_ITEM_CART: {
      const items =
        state.items.find((item) => item._id === payload.item._id).quantity === 1
          ? state.items.filter((item) => item._id !== payload.item._id)
          : state.items.map((item) =>
              item._id === payload.item._id
                ? { ...item, quantity: item.quantity - payload.decrease }
                : item
            );
      const totalPrice = items.reduce(
        (total, { price, quantity }) => total + price * quantity,
        0
      );

      return {
        ...state,
        items,
        totalPrice,
        totalItems: state.totalItems - payload.decrease
      };
    }

    case CartActions.CLEAR_ITEM_CART: {
      return initialState;
    }

    default:
      return state;
  }
};
