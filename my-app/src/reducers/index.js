import { combineReducers } from 'redux';

import { message } from './MessageReducer'
import { user } from './UserReducer'


const rootReducer = combineReducers({
  message,
  user
});

export default rootReducer;