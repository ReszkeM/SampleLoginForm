import { LoginActionTypes, LoginActions } from '../actions/types';

export interface LoginState {
  isLoging: boolean;
  isLoggedIn: boolean;
  errorMessage?: string;
}

export const initialState: LoginState = {
  isLoging: false,
  isLoggedIn: false,
  errorMessage: undefined
};

export function loginReducer(state: LoginState = initialState, action: LoginActions): LoginState {
  switch (action.type) {
    case LoginActionTypes.loginStart:
      return {
        ...state,
        isLoging: true
      };

    case LoginActionTypes.loginSuccess:
      return {
        ...state,
        isLoging: false,
        isLoggedIn: true,
        errorMessage: undefined
      };

    case LoginActionTypes.loginFailed:
      return {
        ...state,
        isLoging: false,
        isLoggedIn: false,
        ...action.payload
      };

    default:
      return state;
  }
}
