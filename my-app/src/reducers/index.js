import { combineReducers } from 'redux';

import { message } from './MessageReducer'
import { user } from './UserReducer'
import { blockchain } from './BlockchainReducer'


const rootReducer = combineReducers({
  message,
  user,
  blockchain,

});

export default rootReducer;