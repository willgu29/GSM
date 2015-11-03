var alt = require('../alt');
var GroupActions = require('../actions/GroupActions');

class GroupStore {
  constructor() {
    this.groups = [];
    this.bindListeners({
      onGroupsReceived: GroupActions.groupsReceived,
      onDataFetchFailed: GroupActions.dataFetchFailed
    });


  }

  onGroupsReceived(result) {
    console.log("result : " +result );
    this.groups = result;
  }
  onDataFetchFailed(result) {

  }
}

module.exports = alt.createStore(GroupStore, 'GroupStore');
