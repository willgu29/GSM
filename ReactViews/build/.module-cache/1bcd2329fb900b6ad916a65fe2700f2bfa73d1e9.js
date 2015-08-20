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
		var messageArray = this.state.messages;
		var messageDisplay = [];
		for (var i = 0; i < messageArray; i++) {
			var message = messageArray[i];
			var messageRow = (React.createElement("ul", null, message.fullName, ": ", message.text));
			messageDisplay.push(messageRow);
		}

		return(
			React.createElement("li", null

			)
		);
	}
});



React.render(React.createElement(MessageList, {convoID: convoID, url: "/api/messages/"}), document.getElementById("message"));