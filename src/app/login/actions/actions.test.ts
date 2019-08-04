import { ActionsTestData } from '../../shared/interfaces/action-test-data';
import { LoginActionTypes, LoginActions } from './types';
import { loginStart, loginSuccess, loginError } from './actions';

describe('Login Actions', () => {
  const testData: ActionsTestData<LoginActions, LoginActionTypes> = [
    {
      action: loginStart(),
      expectedType: LoginActionTypes.loginStart
    },
    {
      action: loginSuccess(),
      expectedType: LoginActionTypes.loginSuccess
    },
    {
      action: loginError(),
      expectedType: LoginActionTypes.loginFailed,
      expectedPayload: { errorMessage: undefined }
    },
    {
      action: loginError('Sample error'),
      expectedType: LoginActionTypes.loginFailed,
      expectedPayload: { errorMessage: 'Sample error' }
    }
  ];

  testData.forEach(({ action, expectedType, expectedPayload }) => {
    it(`should create an action of type ${expectedType}`, () => {
      expect(action.type).toEqual(expectedType);
      expect((action as any).payload).toEqual(expectedPayload);
    });
  });
});
