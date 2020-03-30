export function wallet(state = {}, action){
    switch(action.type){
        case "GETBALANCE_SUCCES":
            return{
                balance: action.balance,
            }
        default:
            return state;
    }
}