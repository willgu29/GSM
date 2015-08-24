var groupID = document.getElementById("groupID").getAttribute("value");
var groupName = document.getElementById("groupName").getAttribute("value");

var GSMSingleGroup = React.createClass({displayName: "GSMSingleGroup",
	getInitialState: function() {
		return ({group:{}});
	},
	loadInitialGroup: function() {
		var getURL = this.props.url + "/" + this.props.groupID;
		$.ajax({
			url: this.props.url,
			type: "GET",
			dataType: 'json',
			cache: false,
			success: function(group) {
        		this.setState({group:group});
      		}.bind(this),
      		error: function(xhr,status,err){
        		console.log("Error: ", err);
      		}.bind(this)
		});
	},
	render: function() {

		var displayGroups = [];


		var childrenGroupNames = this.state.group.childrenGroup_names;
		var childreGroupIds = this.state.group.childrenGroup_ids;
		if (childrenGroupIds) {
			for (var i = 0; i < childrenGroupNames.length; i++) {
				var childGroupID = childrenGroupIds[i];
				var childGroupName = childrenGroupNames[i];

				var groupURL = this.props.url + "/" + childGroupID + "?groupName=" + childGroupName;
				groupsDisplay.push(React.createElement("li", null, React.createElement("a", {href: groupURL}, childGroupName)));
			}
		}
		

		return(
			React.createElement("div", null, 
				React.createElement("p", null, this.props.groupName), 
				React.createElement("ul", null, 
					displayGroups
				)


			)
		);
	}

});

React.render(React.createElement(GSMSingleGroup, {url: "/api/groups", groupID: groupID, groupName: groupName}), document.getElementById("gsmSingleGroup"));