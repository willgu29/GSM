var alt = require('../alt');
var LoginActions = require('../actions/LoginActions');
var LoginSource = require('../sources/LoginSource');


class LoginStore {
  constructor() {
    this.isLoggedIn = false;
    
    this.bindListeners({
      handleLogin: LoginActions.LOGIN,
      handleLoginFailed: LoginActions.LOGIN_FAILED,
      handleTryLogin: LoginActions.TRY_LOGIN

    });

    this.exportAsync(LoginSource);

  }

  handleLogin(isLoggedIn) {
  	console.log("Store: login");
   this.isLoggedIn = isLoggedIn;
  }
  handleLoginFailed(isLoggedIn) {
  	console.log("Store; login failed");
  	this.isLoggedIn = isLoggedIn;
  }
  handleTryLogin() {
  	console.log("Store: try login");
  	this.isLoggedIn = false;
  }

}

module.exports = alt.createStore(LoginStore, 'LoginStore');
