import { AuthActions } from "../actions/authActions";

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

export const initialState = {
  isLoggedIn: Boolean(token),
  user: null || user,
  token: "" || token,
  errorMessage: null,
  isLoading: false,
};

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case AuthActions.AUTH_REGISTER:
      return {
        ...state,
        isLoading: true,
      };
    case AuthActions.AUTH_REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: payload.token,
        user: payload.user,
        errorMessage: null,
      };
    case AuthActions.AUTH_REGISTER_ERROR: {
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
      };
    }
    case AuthActions.AUTH_LOGIN:
      return {
        ...state,
        isLoading: true,
      };
    case AuthActions.AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: payload.token,
        user: payload.user,
        errorMessage: null,
        isLoggedIn: true
      };
    case AuthActions.AUTH_LOGIN_ERROR: {
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
      };
    }
    case AuthActions.AUTH_LOGOUT: {
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
        user: null,
        token: "",
        isLoggedIn: false
      }
    }

    default:
      return {
        ...state,
      };
  }
};
