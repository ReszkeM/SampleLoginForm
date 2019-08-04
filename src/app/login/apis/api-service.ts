import LoginData from '../models/login-data';

export const handleLogin = async (loginData: LoginData) => {
  try {
    return await loginRequest(loginData);
  } catch (error) {
    throw error;
  }
};

const loginRequest = ({ email, password }: LoginData) => {
  if (email === 'test@test.pl' && password === 'Password1') {
    return delayPromise(() => Promise.resolve({ statusCode: 200 }), 1000);
  }

  return delayPromise(
    () =>
      Promise.reject({
        statusCode: 404,
        errorMessage: 'Invalid email or password'
      }),
    1000
  );
};

function delayPromise(callback: () => any, duration: number) {
  return new Promise(resolve => setTimeout(resolve, duration)).then(callback);
}
