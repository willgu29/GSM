var groupID = document.getElementById("groupID").getAttribute("value");
var groupName = document.getElementById("groupName").getAttribute("value");

var GSMSingleGroup = React.createClass({displayName: "GSMSingleGroup",
	getInitialState: function() {
		return ({groupData:{}});
	},
	loadInitialGroup: function() {
		$.ajax({
			url: this.props.url,
			type: "GET",
			dataType: 'json',
			cache: false,
			success: function(group) {
        		this.setState({groupData:group});
      		}.bind(this),
      		error: function(xhr,status,err){
        		console.log("Error: ", err);
      		}.bind(this)
		});
	},
	render: function() {



		return(
			React.createElement("div", null, 
				React.createElement("p", null, this.props.rootGroupName, " Subgroups"), 
				React.createElement("ul", null

				)
			)
		);
	}

});

React.render(React.createElement(GSMSingleGroup, {rootGroupID: groupID, rootGroupName: groupName}), document.getElementById("gsmSingleGroup"));