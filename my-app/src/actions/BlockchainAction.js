import { BlockchainApi } from "../server";
import { blockchainConstants } from "../constants/BlockchainConstants";

const blockchainApi = new BlockchainApi();
function getLastBlock(){
    return dispatch => {
        blockchainApi.blockchainLastBlockGet()
        .then(function(response){
            console.log("Blockchain ", response.hash);
        })
    }

}

function mine(){
    return dispatch => {
        blockchainApi.blockchainLastBlockGet().
        then(function(response){
            console.log("Blockchain ", response.hash);
            dispatch(getLastBlock_succes(response.hash))
        })
    };

    
  function getLastBlock_succes(lastblock) { return { type: blockchainConstants.GETLASTBLOCK_SUCCESS, lastblock } }
}

export const blockchainActions = {
    getLastBlock,
    mine,

  };