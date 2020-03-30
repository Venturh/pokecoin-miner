import { userConstants } from "../constants/UserConstants"
import { UsersApi, RegisterBody, LoginBody } from "../server/"
import { history } from '../constants/History'
import { cookies } from '../constants/Cookie'

const usersAPI = new UsersApi();


function login(username, password) {
  return dispatch => {
    dispatch(login_request("true"));

    usersAPI.authLoginPost(new LoginBody(username, password))
    .then(function(response) {
      console.log("LoginLog ", response);
      cookies.set('username', username, { path: '/' });
      cookies.set('token', response.token, { path: '/' });
      dispatch(login_request(null));
      dispatch(login_success(username, response.token));
      history.push("/mine");
    })
    .catch(function(error){
      console.log("Eroor ", error);
      if(username || password == null){
        dispatch(login_failure("Username or Password empty"));
      }
      dispatch(login_request(null));
      dispatch(login_failure(error.body.message));

    })
  };

  function login_request(loading) { return { type: userConstants.LOGIN_REQUEST, loading } }
  function login_success(username, token) { return { type: userConstants.LOGIN_SUCCESS, username, token } }
  function login_failure(error) { return { type: userConstants.LOGIN_FAILED, error } }
}


function register(username, password) {
  return dispatch => {
    dispatch(request("true"));
  
    usersAPI.authRegisterPost(new RegisterBody(username, password))
    .then(function(response) {
      console.log("LoginLog ", response);
      dispatch(request(null));
      dispatch(login(username, password));

    })
    .catch(function(error){
      console.log("Eroori ", error);
      dispatch(failure(error.body.message));

    })
  };

  function request(loading) { return { type: userConstants.REGISTER_REQUEST, loading } }
  function failure(error) { return { type: userConstants.REGISTER_FAILED, error } }
}

function logout() {
  return dispatch => {
    cookies.remove('username', { path: '/' });
    history.push("/login");

  };
}


export const userActions = {
  login,
  register,
  logout,
};


  

  