var alt = require('../alt');
var UserActions = require('../actions/UserActions');

class LoginStore {
  constructor() {
    this.users = [];
    
    this.bindListeners({
      onUserReceived: UserActions.userReceived,
      onUsersReceived: UserActions.usersReceived
    });


  }

  onUserReceived(result) {
    console.log("Store: login: " + result);
  
  }
  onUsersReceived(users) {
    this.users = users;
  }

}

module.exports = alt.createStore(LoginStore, 'LoginStore');


$.ajax({
      url: "/api/users",
      dataType: 'jsonp',
      cache: false,
      success: function(arrayOfUsers){
      if (this.isMounted()){
        this.setState({users:arrayOfUsers});
      }
      }.bind(this),
      error: function(xhr,status,err){
        console.error(status, err.toString());
      }.bind(this)
      });