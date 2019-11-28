import { combineReducers } from 'redux';

import { message } from './MessageReducer'
import { user } from './UserReducer'
import { blockchain } from './BlockchainReducer'
import { wallet } from './WalletReducer'


const rootReducer = combineReducers({
  message,
  user,
  blockchain,
  wallet,

});

export default rootReducer;