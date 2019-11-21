import { UserConstants, userConstants } from '../constants/UserConstants'

export function message(state = {}, action){
    switch(action.type){
        case userConstants.LOGIN_FAILED:
            return {
                tye: 'login-failed', 
                error: action.error
            };
        case userConstants.LOGIN_REQUEST:
            
            return {
                type: 'login-request',
                request: "true"
            }
        case userConstants.LOGIN_SUCCESS:
            return{
                type: 'login-succes',
                user: action.user,
                token: action.token
            }
        default:
            return state;
    }
}