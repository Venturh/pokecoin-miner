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
        case userConstants.REGISTER_FAILED:
            return{
                type: 'register-failed',
                error: action.error
            }

        default:
            return state;
    }
}