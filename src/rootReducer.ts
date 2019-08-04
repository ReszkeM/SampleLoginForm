import { combineReducers } from 'redux';

import { loginReducer } from './app/login/reducers/reducer';

const rootReducer = combineReducers({
  loginReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
