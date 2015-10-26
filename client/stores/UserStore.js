var alt = require('../alt');
var UserActions = require('../actions/UserActions');

class UserStore {
  constructor() {
    
    this.currentUser = {
      _id: "",
      email: "",
      fullName: "",
      wants: [],
      canOffer: [],
      topFiveTime: ""
    };

    this.fetchedUser = {
      _id: "",
      email: "",
      fullName: "",
      wants: [],
      canOffer: [],
      topFiveTime: ""
    };

    this.bindListeners({
      onUserReceived: UserActions.userReceived,
    });


  }

  onUserReceived(result) {
    this.fetchedUser = result;
  }

}

module.exports = alt.createStore(UserStore, 'UserStore');
