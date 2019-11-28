import { blockchainConstants } from "../constants/BlockchainConstants";


export function wallet(state = {}, action){
    switch(action.type){
        case blockchainConstants.GETBALANCE_SUCCES:
            return{
                balance: action.balance,
            }
        default:
            return state;
    }
}