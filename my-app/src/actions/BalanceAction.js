import { BlockchainApi, WalletApi } from "../server";

const walletApi = new WalletApi();


function getBalance(){
    return dispatch => {
        walletApi.walletBalanceGet().then(function(response){
            dispatch(getBalance_succes(response.amount))
        }).catch(function(error){
            console.log("error",error)
        })
        
    };
    function getBalance_succes(balance) { return { type: "GETBALANCE_SUCCES", balance }}
}

export const balanceAction = {
    getBalance,

  };