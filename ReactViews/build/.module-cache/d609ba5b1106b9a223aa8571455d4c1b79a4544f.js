var groupID = document.getElementById("groupID").getAttribute("value");
var groupName = document.getElementById("groupName").getAttribute("value");

var GSMSingleGroup = React.createClass({displayName: "GSMSingleGroup",
	getInitialState: function() {
		return ({group:{}});
	},
	componentDidMount: function() {
		this.loadInitialGroup();
	},
	loadInitialGroup: function() {
		var getURL = this.props.url + "/" + this.props.groupID;
		$.ajax({
			url: getURL,
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

		var groupsDisplay = [];


		var childrenGroupNames = this.state.group.childrenGroup_names;
		var childrenGroupIds = this.state.group.childrenGroup_ids;
		if (childrenGroupIds) {
			console.log("EYA");
			for (var i = 0; i < childrenGroupNames.length; i++) {
				console.log("entering for");
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
					groupsDisplay
				)


			)
		);
	}

});

React.render(React.createElement(GSMSingleGroup, {url: "/api/groups", groupID: groupID, groupName: groupName}), document.getElementById("gsmSingleGroup"));