var groupID = document.getElementById("groupID").getAttribute("value");
var groupName = document.getElementById("groupName").getAttribute("value");

var GSMSingleGroup = React.createClass({
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

				var groupURL = "/groups/" + childGroupID + "?groupName=" + childGroupName;
				groupsDisplay.push(<li><a href={groupURL}>{childGroupName}</a></li>);
			}
		}
		

		return(
			<div>
				<p>{this.props.groupName}</p>
				<ul>
					{groupsDisplay}
				</ul>


			</div>
		);
	}

});

// React.render(<GSMSingleGroup url="/api/groups" groupID={groupID}  groupName={groupName} />, document.getElementById("gsmSingleGroup"));