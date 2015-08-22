
var GroupList = React.createClass({displayName: "GroupList",

		
	render: function() {

		var groupsArray = this.props.groups;
		var groupsDisplay = [];
		console.log(groupsArray);
		//Parse and order groups into lists (by root group level 1)
		for (var i = 0; i < groupsArray.length; i++) {
			var group = groupsArray[i];
			if(group.level == this.props.queryLevel) {
				var groupURL = this.props.url + "/" + group._id;
				groupsDisplay.push(React.createElement("li", null, React.createElement("a", {href: this.props.url+"/"+group._id}, group.name)));

				var childrenGroupItems = [];
				if (group.childrenGroups_ids) {
					for (var k = 0; k< group.childrenGroups_ids.length; k++) {

						var childGroupNames = groups.childrenGroups_names;
						childrenGroupItems.push(React.createElement("li", null, childGroupNames[k]));
						if (k == group.childrenGroups_ids.length-1) {
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
				React.createElement(GroupList, {groups: this.state.groups, queryLevel: this.props.queryLevel})
			)
		);
	}

});

React.render(React.createElement(GSMGroupView, {url: "/api/groups", queryLevel: "1"}), document.getElementById("gsmGroupView"));