
var GroupList = React.createClass({displayName: "GroupList",

		
	render: function() {

		var groupsArray = this.props.groups;
		var groupsDisplay = [];

		//Parse and order groups into lists (by root group level 1)
		for (var i = 0; i < groupsArray.length; i++) {
			var group = groupsArray[i];
			if(group.level == this.props.queryLevel) {
				groupsDisplay.push(React.createElement("li", null, group.name));
				for (var k = 0; k< group.childrenGroups_ids.length; k++) {
					if (k == 0) {
						groupsDisplay.push(React.createElement("ul", null, " "));
					}
			
					
				}
			}
		}	

		return(
			React.createElement("ul", null, 
				groupsDisplay
			)
		);
	}

});

var GSMGroupView = React.createClass({displayName: "GSMGroupView",
	getInitialState: function() {
		return ({groups: []});
	},
	loadInitialGroups: function() {

		var urlGet = this.props.url + "?level=" +this.props.queryLevel;
		$.ajax({
			url: urlGet,
			dataType: 'json',
			cache: false,
			success: function(groups) {
        		this.setState({groups:groups});
      		}.bind(this),
      		error: function(xhr,status,err){
        		console.log("Error: ", err);
      		}.bind(this)

		});
	},
	render: function() {
		return(
			React.createElement(GroupList, {groups: this.state.groups, queryLevel: this.props.queryLevel})
		);
	}

});

React.render(React.createElement(GSMGroupView, {url: "/api/groups", queryLevel: "1"}), document.getElementById("gsmGroupView"));