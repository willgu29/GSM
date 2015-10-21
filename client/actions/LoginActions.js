var alt = require("../alt");

class LoginActions {
  login(isLoggedIn){
    this.dispatch(isLoggedIn);
  }
  loginFailed(isLoggedIn){
  	this.dispatch(isLoggedIn);
  }
  tryLogin() {
  	console.log("Actions: try login");
  	this.dispatch();
  }

}

module.exports = alt.createActions(LoginActions);
