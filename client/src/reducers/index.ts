import { combineReducers } from 'redux';
import messages from './messages';
import users from './users';
import user from './user';

const reducers = combineReducers({
  messages,
  users,
  user
});

export default reducers;
