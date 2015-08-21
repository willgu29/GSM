
var GroupList = React.createClass({

		
	render: function() {

		var groupsArray = this.props.groups;
		var groupsDisplay = [];

		//Parse and order groups into lists (by root group level 1)
		for (var i = 0; i < groupsArray.length; i++) {
			var group = groupsArray[i];
			if(group.level == this.props.queryLevel) {
				groupsDisplay.push(<li>{group.name}</li>);

				var childrenGroupItems = [];
				for (var k = 0; k< group.childrenGroups_ids.length; k++) {

					var childGroupNames = groups.childrenGroups_names;
					childrenGroupItems.push(<li>{childGroupNames[k]}</li>);
					if (k == group.childrenGroups_ids.length-1) {
						groupsDisplay.push(<ul>{childrenGroupItems}</ul>);
					}
				}
			}
		}	

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
	render: function() {
		return(
			<GroupList groups={this.state.groups} queryLevel={this.props.queryLevel} />
		);
	}

});

React.render(<GSMGroupView url="/api/groups" queryLevel="1" />, document.getElementById("gsmGroupView"));