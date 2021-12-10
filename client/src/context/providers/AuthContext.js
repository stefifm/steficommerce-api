import { createContext, useContext, useReducer } from "react";
import { register, profile } from "../../api/authApi";
import { initialState, authReducer } from "../reducer/authReducer";
import { AuthActions } from "../actions/authActions";

export const AuthContext = createContext(initialState);

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const regis = async ({ email, password }) => {
    dispatch({ type: AuthActions.AUTH_REGISTER });
    try {
      const res = await register({ email, password });
      const { token } = res.data;

      const resUser = await profile(token);

      dispatch({
        type: AuthActions.AUTH_REGISTER_SUCCESS,
        payload: {
          token,
          user: resUser.data,
        },
      });
    } catch (error) {
      if (error.response.data) {
        console.log(error)
        dispatch({
          type: AuthActions.AUTH_REGISTER_ERROR,
          payload: error.response.statusText,
        });
      }
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, regis }}>
      {children}
    </AuthContext.Provider>
  );
};
