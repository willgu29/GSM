var convoID = document.getElementById("convoID").getAttribute("value");


var MessageList = React.createClass({displayName: "MessageList",
	getInitialState: function() {
		return ({messages: []});
	},
	componentDidMount: function() {
		var urlGet = this.props.url + this.props.convoID;
		$.ajax({
			url: urlGet,
			type: "GET",
			dataType: "json",
			success: function(messages) {
        		this.setState({messages: messages});
      		}.bind(this),
      		error: function(xhr,status,err){
        		console.log("Error: ", err);
      		}.bind(this)
		});
	},

	render: function (){
		return(
			React.createElement("p", null, this.props.convoID)
		);
	}
});



React.render(React.createElement(MessageList, {convoID: convoID, url: "/api/messages/"}), document.getElementById("message"));