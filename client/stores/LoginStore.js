var alt = require('../alt');
var LoginActions = require('../actions/LoginActions');

class LoginStore {
  constructor() {
    this.isLoggedIn = false;
    
    this.bindListeners({
      onLoginSuccess: LoginActions.loginSuccess,
      onLoginFailed: LoginActions.loginFailed
    });


  }

  onLoginSuccess(result) {
  	console.log("Store: login");
   	this.isLoggedIn = true;
  }
  onLoginFailed(isLoggedIn) {
  	console.log("Store; login failed");
  	this.isLoggedIn = isLoggedIn;
  }

}

module.exports = alt.createStore(LoginStore, 'LoginStore');
