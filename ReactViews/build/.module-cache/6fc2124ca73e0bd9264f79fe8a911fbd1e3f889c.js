var convoID = document.getElementById("convoID").getAttribute("value");


var MessageList = React.createClass({displayName: "MessageList",

	componentDidLoad: function() {

	},

	render: function (){
		return(
			React.createElement("p", null, this.props.convoID)
		);
	}
});



React.render(React.createElement(MessageList, {convoID: convoID}), document.getElementById("message"));