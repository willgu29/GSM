var groupID = document.getElementById("groupID").getAttribute("value");
var groupName = document.getElementById("groupName").getAttribute("value");

var GSMSingleGroup = React.createClass({displayName: "GSMSingleGroup",
	getInitialState: function() {
		return ({groupData:{}});
	},
	loadInitialGroup: function() {
		var getURL = this.props.url + "/" + this.props.groupID;
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
				React.createElement("p", null, this.props.groupName, " S"), 
				React.createElement("ul", null

				)
			)
		);
	}

});

React.render(React.createElement(GSMSingleGroup, {url: "/api/groups", groupID: groupID, groupName: groupName}), document.getElementById("gsmSingleGroup"));