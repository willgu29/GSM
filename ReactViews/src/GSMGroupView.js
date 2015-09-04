
var GroupList = React.createClass({

		
	render: function() {

		var groupsArray = this.props.groups;
		var groupsDisplay = [];
		console.log(groupsArray);
		//Parse and order groups into lists (by root group level 1)
		for (var i = 0; i < groupsArray.length; i++) {
			var group = groupsArray[i];
			if(group.level == this.props.queryLevel) {
				var groupURL = this.props.url + "/" + group._id + "?groupName=" + group.name;
				groupsDisplay.push(<li><a href={groupURL}>{group.name}</a></li>);
				var childrenGroupItems = [];
				if (group.childrenGroup_ids) {
					for (var k = 0; k< group.childrenGroup_ids.length; k++) {
						var childGroupNames = group.childrenGroup_names;
						var childenGroupURL = this.props.url + "/" + group.childrenGroup_ids[k]
												+ "?groupName=" + group.childrenGroup_names[k];
						childrenGroupItems.push(<li><a href={childenGroupURL}>{childGroupNames[k]}</a></li>);
						if (k == group.childrenGroup_ids.length-1) {
							groupsDisplay.push(<ul>{childrenGroupItems}</ul>);
						}
					}	
				}
				
			}
		}	
		console.log(groupsDisplay);
		return(
			<ul>
				{groupsDisplay}
			</ul>
		);
	}

});

var GSMGroupView = React.createClass({
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
		if (this.state.groups == "") {
			noGroups = <p>No groups joined yet.</p>
		}
		return(
			<div>
				<GroupList url="/groups" groups={this.state.groups} queryLevel={this.props.queryLevel} />
				{noGroups}
			</div>
		);
	}

});

React.render(<GSMGroupView url="/api/groups" queryLevel="1" />, document.getElementById("gsmGroupView"));