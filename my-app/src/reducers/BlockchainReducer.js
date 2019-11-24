import { blockchainConstants } from "../constants/BlockchainConstants";


export function blockchain(state = {}, action){
    switch(action.type){
        case blockchainConstants.GETLASTBLOCK_SUCCESS:
            return{
                type: 'getlastblock-succes',
                prevhash: action.lastblock,
            }
        default:
            return state;
    }
}