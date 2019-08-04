import { Action } from 'redux';

import { ActionWithPayload } from '../../shared/interfaces/actions';

export enum LoginActionTypes {
  loginStart = '[LOGIN] LOGIN_START',
  loginSuccess = '[LOGIN] LOGIN_SUCCESS',
  loginFailed = '[LOGIN] LOGIN_FAILED'
}

export interface LoginFaileddData {
  errorMessage?: string;
}

export interface LoginStart extends Action<LoginActionTypes.loginStart> {}
export interface LoginSuccess extends Action<LoginActionTypes.loginSuccess> {}
export interface LoginFailed extends ActionWithPayload<LoginActionTypes.loginFailed, LoginFaileddData> {}

export type LoginActions = LoginStart | LoginSuccess | LoginFailed;
