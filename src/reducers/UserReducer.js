import { UserConstants, userConstants } from '../constants/UserConstants'

export function user(state = {}, action){
    switch(action.type){
        case userConstants.LOGIN_SUCCESS:
            return{
                type: 'login-succes',
                username: action.username,
                token: action.token
            }
        case userConstants.REGISTER_SUCCESS:
            return{
                type: 'register-succes',
                username: action.username
            }
        default:
            return state;
    }
}