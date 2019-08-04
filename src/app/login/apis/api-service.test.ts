import { handleLogin } from './api-service';
import LoginData from '../models/login-data';

describe('handleLogin', () => {
  it('returns success when email and password are valid', () => {
    return expect(handleLogin(new LoginData('test@test.pl', 'Password1'))).resolves.toEqual({ statusCode: 200 });
  });

  it('returns error when email or password is invalid', () => {
    return expect(handleLogin(new LoginData('test@test.pl', 'aaa'))).rejects.toEqual({
      statusCode: 404,
      errorMessage: 'Invalid email or password'
    });
  });
});
