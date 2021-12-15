import { createContext, useContext, useReducer } from "react";
import { register, profile, login } from "../../api/authApi";
import { initialState, authReducer } from "../reducer/authReducer";
import { AuthActions } from "../actions/authActions";

export const AuthContext = createContext(initialState);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Its not in AuthProvider")
  return context;
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const regis = async ({ email, password }) => {
    dispatch({ type: AuthActions.AUTH_REGISTER });
    try {
      const res = await register({ email, password });
      const { token } = res.data;

      localStorage.setItem("token", token);

      if (token) {
        const resUser = await profile(token);

        localStorage.setItem("user", JSON.stringify(resUser.data));

        dispatch({
          type: AuthActions.AUTH_REGISTER_SUCCESS,
          payload: {
            token,
            user: resUser.data,
          },
        });
        return resUser.data;
      }
    } catch (error) {
      if (error.response.data) {
        dispatch({
          type: AuthActions.AUTH_REGISTER_ERROR,
          payload: error.response.data.message,
        });
      }
    }
  };

  const log = async ({ email, password }) => {
    dispatch({ type: AuthActions.AUTH_LOGIN });
    try {
      const res = await login({ email, password });
      const { token } = res.data;

      localStorage.setItem("token", token);

      if (token) {
        const resUser = await profile(token);

        localStorage.setItem("user", JSON.stringify(resUser.data));

        dispatch({
          type: AuthActions.AUTH_LOGIN_SUCCESS,
          payload: {
            token,
            user: resUser.data,
          },
        });
        return resUser.data;
      }
    } catch (error) {
      if (error.response.data) {
        dispatch({
          type: AuthActions.AUTH_LOGIN_ERROR,
          payload: error.response.data.message,
        });
      }
    }
  };

  const logout = async () => {
    localStorage.clear()
    dispatch({type: AuthActions.AUTH_LOGOUT})
  }

  return (
    <AuthContext.Provider value={{ ...state, regis, log, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
