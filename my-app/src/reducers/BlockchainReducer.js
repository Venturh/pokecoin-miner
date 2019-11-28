import { blockchainConstants } from "../constants/BlockchainConstants";


export function blockchain(state = {}, action){
    switch(action.type){
        case blockchainConstants.BLOCKCHAIN_REQUEST:
            return{
                loading: action.loading,
            }
        case blockchainConstants.BLOCKCHAIN_SUCCESS:
            console.log("Mining succes", action.succes)
            return{
                blockfound: action.succes,
            }

        case blockchainConstants.GETBALANCE_SUCCES:
            return{
                balance: action.balance,
            }
        default:
            return state;
    }
}