var alt = require("../alt");
var LoginAPI = require('../utils/LoginAPI');

class LoginActions {
	constructor() {
		this.generateActions(
			'loginSuccess',
			'loginFailed'

		);
	}
  	
  	tryLogin(email, password) {
  		LoginAPI.tryLogin(email, password).then(function(result){
  			console.log("NEW RESULT: "+ JSON.stringify(result));
  			this.actions.loginSuccess(result);

  		}).catch(function(error) {

  		});
  	}



}

module.exports = alt.createActions(LoginActions);
