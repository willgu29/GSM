
var GroupList = React.createClass({displayName: "GroupList",

		
	render: function() {

		var groupsArray = this.props.groups;
		var groupsDisplay = [];
		console.log(groupsArray);
		//Parse and order groups into lists (by root group level 1)
		for (var i = 0; i < groupsArray.length; i++) {
			var group = groupsArray[i];
			if(group.level == this.props.queryLevel) {
				var groupURL = this.props.url + "/" + group._id + "?groupName=" + group.name;
				groupsDisplay.push(React.createElement("li", null, React.createElement("a", {href: groupURL}, group.name)));
				var childrenGroupItems = [];
				if (group.childrenGroup_ids) {
					for (var k = 0; k< group.childrenGroup_ids.length; k++) {
						var childGroupNames = group.childrenGroup_names;
						var childenGroupURL = this.props.url + "/" + group.childrenGroup_ids[k]
												+ "?groupName=" + group.childrenGroup_names[k];
						childrenGroupItems.push(React.createElement("li", null, React.createElement("a", {href: childenGroupURL}, childGroupNames[k])));
						if (k == group.childrenGroup_ids.length-1) {
							groupsDisplay.push(React.createElement("ul", null, childrenGroupItems));
						}
					}	
				}
				
			}
		}	
		console.log(groupsDisplay);
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
	componentDidMount: function() {
		this.loadInitialGroups();
	},
	render: function() {
		var noGroups;
		if (this.state.groups == []) {
			noGroups = React.createElement("p", null, "No groups joined yet.")
		}
		return(
			React.createElement("div", null, 
				React.createElement(GroupList, {url: "/groups", groups: this.state.groups, queryLevel: this.props.queryLevel}), 
				noGroups
			)
		);
	}

});

React.render(React.createElement(GSMGroupView, {url: "/api/groups", queryLevel: "1"}), document.getElementById("gsmGroupView"));