var alt = require('../alt');
varr GroupActions = require('../actions/GroupActions');

class GroupStore {
  constructor() {
    this.groups = [];
    this.bindListeners({
      onGroupsReceived: GroupActions.groupsReceived,
    });


  }

  onGroupsReceived(result) {
    this.groups = result;
  }

}

module.exports = alt.createStore(GroupStore, 'GroupStore');
