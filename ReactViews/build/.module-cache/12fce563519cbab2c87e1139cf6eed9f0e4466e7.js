var convoID = document.getElementById("convoID").getAttribute("value");


var MessageList = React.createClass({displayName: "MessageList",
	render: function (){
		return(
			React.createElement("p", null, "HI")
		);
	}
});



React.render(React.createElement(MessageList, {convoID: convoID}), document.getElementById("message"));