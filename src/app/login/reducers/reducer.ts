import { LoginActionTypes, LoginActions } from '../actions/types';

export interface LoginState {
  isLoging: boolean;
  isLogedIn: boolean;
  errorMessage?: string;
}

export const initialState: LoginState = {
  isLoging: false,
  isLogedIn: false,
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
        isLogedIn: true
      };

    case LoginActionTypes.loginFailed:
      return {
        ...state,
        isLoging: false,
        isLogedIn: false,
        ...action.payload
      };

    default:
      return state;
  }
}
