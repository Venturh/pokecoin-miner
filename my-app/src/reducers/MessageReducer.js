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
                login_request: action.loading
            };
        case userConstants.REGISTER_REQUEST:
            return {
                type: 'register-request',
                register_request: action.loading
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