import { UserConstants, userConstants } from '../constants/UserConstants'

export function user(state = {}, action){
    switch(action.type){
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