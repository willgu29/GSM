var convoID = document.getElementById("convoID").getAttribute("value");


var MessageList = React.createClass({displayName: "MessageList",

	componentDidMount: function() {
		var urlGet = this.props.url + this.props.convoID;
		$.ajax({
			url: urlGet,
			type: "GET",
			dataType: "json",


		});
	},

	render: function (){
		return(
			React.createElement("p", null, this.props.convoID)
		);
	}
});



React.render(React.createElement(MessageList, {convoID: convoID, url: "/api/messages/"}), document.getElementById("message"));