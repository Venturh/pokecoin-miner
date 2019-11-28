import { blockchainConstants } from "../constants/BlockchainConstants";


export function blockchain(state = {}, action){
    switch(action.type){
        case blockchainConstants.BLOCKCHAIN_REQUEST:
            return{
                ...state,
                loading: action.loading,
            }
        case blockchainConstants.BLOCKCHAIN_SUCCESS:
            console.log("Mining succes", action.succes)
            return{
                ...state,
                blockfound: action.succes,
            }
        default:
            return state;
    }
}