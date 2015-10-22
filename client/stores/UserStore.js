var alt = require('../alt');
var UserActions = require('../actions/UserActions');

class UserStore {
  constructor() {
    this.users = [];
    
    this.bindListeners({
      onUserReceived: UserActions.userReceived,
      onUsersReceived: UserActions.usersReceived
    });


  }

  onUserReceived(result) {
    //TODO: save user  
  }
  onUsersReceived(users) {
    this.users = users;
  }

}

module.exports = alt.createStore(UserStore, 'UserStore');
