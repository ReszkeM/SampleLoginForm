import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';

import { loginProcess } from './thunk-actions';
import { LoginActionTypes } from './types';
import LoginData from '../models/login-data';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Thunk Actions', () => {
  let sandbox: sinon.SinonSandbox;
  let server: sinon.SinonFakeServer;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    server = sandbox.useFakeServer();
  });

  afterEach(() => {
    server.restore();
    sandbox.restore();
  });

  describe('loginProcess', () => {
    it('dispatch proper actions on success', async () => {
      const store = mockStore({});
      const expectedActions = [LoginActionTypes.loginStart, LoginActionTypes.loginSuccess];

      return store.dispatch<any>(loginProcess(new LoginData('test@test.pl', 'Password1'))).then(async () => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
    });

    it('dispatch proper actions when failed', () => {
      const store = mockStore({});
      const expectedActions = [LoginActionTypes.loginStart, LoginActionTypes.loginFailed];

      return store.dispatch<any>(loginProcess(new LoginData('fake.email@gmail.com', 'fakePassword'))).then(() => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
    });
  });
});
