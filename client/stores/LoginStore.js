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
   this.isLoggedIn = isLoggedIn;
  }
  handleLoginFailed(isLoggedIn) {
  	this.isLoggedIn = isLoggedIn;
  }
  handleTryLogin() {
  	this.isLoggedIn = false;
  }

}

module.exports = alt.createStore(LoginStore, 'LoginStore');
