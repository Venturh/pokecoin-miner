import { BlockchainApi } from "../server";
import { blockchainConstants } from "../constants/BlockchainConstants";

const blockchainApi = new BlockchainApi();
function blockrequest(){
    return dispatch => {
        dispatch(blogchain_request(true));
        function blogchain_request(loading) { return { type: blockchainConstants.BLOCKCHAIN_REQUEST, loading } 
        }
    }
}

function mine(addBlockBody){
    return dispatch => {
        

        console.log("addblock", addBlockBody);
        blockchainApi.blockchainBlocksPost(addBlockBody)
        .then(function(test){
            console.log("block erzeugen",test.body.message);
            dispatch(blogchain_succes(true))
            dispatch(blogchain_request(false))
        })
           
        .catch(function(error){
            console.log("blockError", error)
            dispatch(blogchain_request(false))
        })
    };
    function blogchain_request(loading) { return { type: blockchainConstants.BLOCKCHAIN_REQUEST, loading } }
    function blogchain_succes(succes) { return { type: blockchainConstants.GETLASTBLOCK_SUCCESS, succes} }

}
export const blockchainActions = {
    blockrequest,
    mine,

  };