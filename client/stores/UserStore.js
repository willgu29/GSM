var alt = require('../alt');
var UserActions = require('../actions/UserActions');

class UserStore {
  constructor() {
    

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
    this.fetchedUser = {
      _id: result._id,
      email: result.email,
      fullName: result.fullName,
      wants: result.identity.wants,
      canOffer: result.identity.canOffer,
      topFiveTime: result.identity.topFiveTime
    }
  }

}

module.exports = alt.createStore(UserStore, 'UserStore');
