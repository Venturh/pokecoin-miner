import { BlockchainApi, WalletApi } from "../server";
import { blockchainConstants } from "../constants/BlockchainConstants";

const blockchainApi = new BlockchainApi();
const walletApi = new WalletApi();
function blockrequest(){
    return dispatch => {
        dispatch(blogchain_request(true));
    };
    function blogchain_request(loading) { return { type: blockchainConstants.BLOCKCHAIN_REQUEST, loading }}
}

function stop(){
    return dispatch => {
        dispatch(blogchain_request(false));
    };
    function blogchain_request(loading) { return { type: blockchainConstants.BLOCKCHAIN_REQUEST, loading }}
}

function mine(addBlockBody){
    return dispatch => {

        console.log("addblock", addBlockBody);
        blockchainApi.blockchainBlocksPost(addBlockBody)
        .then(function(test){
            console.log("block erzeugen",test.block);
            dispatch(blogchain_request(false))
            dispatch(blogchain_succes(true))
        })
           
        .catch(function(error){
            console.log("blockError", error)
            dispatch(blogchain_request(false))
        })
    };
    function blogchain_request(loading) { return { type: blockchainConstants.BLOCKCHAIN_REQUEST, loading } }
    function blogchain_succes(succes) { return { type: blockchainConstants.BLOCKCHAIN_SUCCESS, succes} }

}

function getBalance(){
    return dispatch => {
        walletApi.walletBalanceGet().then(function(response){
            console.log("succes", response.amount)
            dispatch(getBalance_succes(response.amount))
        }).catch(function(error){
            console.log("error",error)
        })
        
    };
    function getBalance_succes(balance) { return { type: blockchainConstants.GETBALANCE_SUCCES, balance }}
}

export const blockchainActions = {
    blockrequest,
    mine,
    stop,
    getBalance

  };