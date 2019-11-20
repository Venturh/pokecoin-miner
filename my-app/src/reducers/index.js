import { userConstants } from "../constants/UserConstants";

const initialState = {};

const authentication = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return (
        {
            auth: action.authentication

        }
      );
    default:
      return state;
  }
}

export default authentication;
