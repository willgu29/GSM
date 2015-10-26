var alt = require('../alt');
var TableActions = require('../actions/TableActions');

class TableStore {
  constructor() {
    this.users = [];
    
    this.bindListeners({
      onUserArrayReceived: TableActions.userArrayReceived,
      onDataFetchFailed: TableActions.dataFetchFailed,
    });


  }

  onUserArrayReceived(result) {
  	this.users = result;
  
  }
  onDataFetchFailed(error) {
  	console.log("Data fetch failed: " + error)
  }

}

module.exports = alt.createStore(TableStore, 'TableStore');
