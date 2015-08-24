
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
						console.log("entered for loop");
						var childGroupNames = group.childrenGroup_names;
						var childenGroupURL = this.props.url + "/" + group.childrenGroup_ids[k];
						childrenGroupItems.push(React.createElement("li", null, React.createElement("a", {href: childenGroupURL}, childGroupNames[k])));
						if (k == group.childrenGroup_ids.length-1) {
							console.log("CHildren group: " + childrenGroupItems);
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
		return(
			React.createElement("div", null, 
				React.createElement(GroupList, {url: "/groups", groups: this.state.groups, queryLevel: this.props.queryLevel})
			)
		);
	}

});

React.render(React.createElement(GSMGroupView, {url: "/api/groups", queryLevel: "1"}), document.getElementById("gsmGroupView"));