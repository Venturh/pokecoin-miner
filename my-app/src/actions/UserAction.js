import { userConstants } from "../constants/UserConstants"
import { UsersApi, RegisterBody, LoginBody, ResponseBody } from "../server/"
 
const usersAPI = new UsersApi();


  function login(username, password){

    usersAPI.authLoginPost(new LoginBody(username, password))
    .then(function(token) {
      console.log("LoginLog ", token);
    })
    .catch(function(error){
      console.log("ErrorLog ", error);

    })

    return {
      type: userConstants.LOGIN_REQUEST,
    }
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


  

  