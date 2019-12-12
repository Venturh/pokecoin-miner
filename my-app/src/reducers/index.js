import { combineReducers } from 'redux';

import { message } from './MessageReducer'
import { user } from './UserReducer'
import { wallet } from './WalletReducer'


const rootReducer = combineReducers({
  message,
  user,
  wallet,

});

export default rootReducer;