import { combineReducers } from 'redux';
import messages from './messages';
import users from './users';

const reducers = combineReducers({
  messages,
  users
});

export default reducers;
