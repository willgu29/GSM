var alt = require("../alt");

class LoginActions {
  login (isLoggedIn){
    this.dispatch(isLoggedIn);
  },
  loginFailed(isLoggedIn){
  	this.dispatch(isLoggedIn);
  },
  tryLogin() {
  	this.dispatch();
  }

}

module.exports = alt.createActions(LoginActions);
