import { blockchainConstants } from "../constants/BlockchainConstants";


export function blockchain(state = {}, action){
    switch(action.type){
        case blockchainConstants.BLOCKCHAIN_REQUEST:
            return{
                loading: action.loading,
            }
        case blockchainConstants.BLOCKCHAIN_SUCCESS:
            return{
                blockfound: action.succes,
            }
        default:
            return state;
    }
}