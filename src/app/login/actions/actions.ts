import { LoginActionTypes, LoginStart, LoginFailed, LoginSuccess } from './types';

export const loginStart = (): LoginStart => ({
  type: LoginActionTypes.loginStart
});

export const loginSuccess = (): LoginSuccess => ({
  type: LoginActionTypes.loginSuccess
});

export const loginError = (errorMessage?: string): LoginFailed => ({
  type: LoginActionTypes.loginFailed,
  payload: { errorMessage }
});
