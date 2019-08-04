import { loginReducer, initialState, LoginState } from './reducer';
import { loginStart, loginSuccess, loginError } from '../actions/actions';

describe('Action Items Projects Reducer', () => {
  describe('loginStart', () => {
    it('should handle loginStart action', () => {
      const result = loginReducer(initialState, loginStart());

      expect(result).toEqual({
        ...initialState,
        isLoging: true
      });
    });
  });

  describe('loginSuccess', () => {
    it('should handle loginSuccess', () => {
      const state: LoginState = {
        ...initialState,
        isLoging: true,
        isLogedIn: false
      };
      const result = loginReducer(state, loginSuccess());

      expect(result).toEqual({
        ...initialState,
        isLoging: false,
        isLogedIn: true
      });
    });
  });

  describe('loginError', () => {
    it('should handle loginError with', () => {
      const state: LoginState = {
        ...initialState,
        isLoging: false,
        isLogedIn: false,
        errorMessage: undefined
      };
      const result = loginReducer(state, loginError('some error'));

      expect(result).toEqual({
        ...initialState,
        isLoging: false,
        isLogedIn: false,
        errorMessage: 'some error'
      });
    });
  });
});
