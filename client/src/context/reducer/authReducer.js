import { AuthActions } from '../actions/authActions'

export const initialState = {
    isLoggedIn: false,
    user: null,
    token: null,
    errorMessage: null,
    isLoading: false,
  };

  export const authReducer = (state = initialState, action) => {
      const {type, payload} = action
      switch (type) {
          case AuthActions.AUTH_REGISTER:
              return {
                  ...state,
                  isLoading: true,
              }
            case AuthActions.AUTH_REGISTER_SUCCESS:
                return {
                    ...state,
                    isLoading: false,
                    token: payload.token,
                    user: payload.user,
                    isLoggedIn: true,
                }
            case AuthActions.AUTH_REGISTER_ERROR: {
                return {
                    ...state,
                    isLoading: false,
                    errorMessage: payload
                }
            }
      
          default:
              return {
                  ...state,
              };
      }
  }