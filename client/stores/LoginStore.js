var alt = require('../alt');
var LoginActions = require('../actions/LoginActions');

class LoginStore {
  constructor() {
    this.isLoggedIn = false;
    this.currentUserID = "";
    this.isFirstLogin = false;
    this.newAccountInfo= {};
    this.bindListeners({
      onLoginSuccess: LoginActions.loginSuccess,
      onLoginFailed: LoginActions.loginFailed,
      onLogout: LoginActions.logout,
      onLoginStatusUpdated: LoginActions.loginStatusUpdated,
      onNewAccountCreated: LoginActions.newAccountCreated
    });


  }

  onNewAccountCreated(result) {
    this.isFirstLogin = true;
    this.newAccountInfo = result;
  }

  onLoginSuccess(result) {
    this.isFirstLogin = false;
  	this.isLoggedIn = true;
    this.currentUserID = result._id;
  
  }
  onLoginFailed(isLoggedIn) {
  	console.log("Store; login failed");
  }
  onLogout() {
  	this.isLoggedIn = false;
  }
  onLoginStatusUpdated() {
    
  }

}

module.exports = alt.createStore(LoginStore, 'LoginStore');
