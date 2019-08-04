import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';

import { LoginState } from '../reducers/reducer';
import { LoginStart } from './types';
import { loginStart, loginSuccess, loginError } from './actions';
import LoginData from '../models/login-data';
import { handleLogin } from '../apis/api-service';

export const loginProcess = (loginData: LoginData): ThunkAction<void, LoginState, null, LoginStart> => async (
  dispatch: Dispatch
): Promise<void> => {
  dispatch(loginStart());

  try {
    await handleLogin(loginData);
    dispatch(loginSuccess());
  } catch (error) {
    dispatch(loginError(error.errorMessage));
  }
};
