
var GroupList = React.createClass({

		
	render: function() {

		var groupsArray = this.props.groups;
		var groupsDisplay = [];
		console.log(groupsArray);
		//Parse and order groups into lists (by root group level 1)
		for (var i = 0; i < groupsArray.length; i++) {
			var group = groupsArray[i];
			if(group.level == this.props.queryLevel) {
				var groupURL = this.props.url + "/" + group._id;
				groupsDisplay.push(<li><a href={groupURL}>{group.name}</a></li>);

				var childrenGroupItems = [];
				if (group.childrenGroups_ids) {
					for (var k = 0; k< group.childrenGroups_ids.length; k++) {

						var childGroupNames = groups.childrenGroups_names;
						var childenGroupURL = this.props.url + "/" + group.childrenGroups_ids[k];
						childrenGroupItems.push(<li><a href={childenGroupURL}>{childGroupNames[k]}</a></li>);
						if (k == group.childrenGroups_ids.length-1) {
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
		return(
			<div>
				<GroupList groups={this.state.groups} queryLevel={this.props.queryLevel} />
			</div>
		);
	}

});

React.render(<GSMGroupView url="/api/groups" queryLevel="1" />, document.getElementById("gsmGroupView"));