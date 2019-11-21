import { userConstants } from "../constants/UserConstants"
import { UsersApi, RegisterBody, LoginBody, ResponseBody } from "../server/"
const usersAPI = new UsersApi();




function login(username, password) {
  return dispatch => {
    dispatch(request());

    usersAPI.authLoginPost(new LoginBody(username, password))
    .then(function(response) {
      console.log("LoginLog ", response);

      dispatch(success(username, response.token));
    })
    .catch(function(error){
      dispatch(failure(error.body.message));

    })
  };

  function request() { return { type: userConstants.LOGIN_REQUEST } }
  function success(username, token) { return { type: userConstants.LOGIN_SUCCESS, username, token } }
  function failure(error) { return { type: userConstants.LOGIN_FAILED, error } }
}


function register(username, password) {
    const registerbody = new RegisterBody(username, password);
    usersAPI.authRegisterPost(registerbody);
    console.log(password);
    return {
      type: userConstants.REGISTER_REQUEST,
    }
}

export const userActions = {
  login,
  register,
};


  

  