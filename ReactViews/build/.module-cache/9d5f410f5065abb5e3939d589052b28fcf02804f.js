var convoID = document.getElementById("convoID").getAttribute("value");

var MessageRow = React.createClass({displayName: "MessageRow",

	render: function() {
		return(
			React.createElement("ul", null, this.props.fullName, ": ", this.props.text)
		);
	}

});

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
	refreshMessageList: function(messages) {
		this.setState({messages: messages});
	},
	render: function (){
		var messageArray = this.state.messages;
		var messageDisplay = [];
		for (var i = 0; i < messageArray.length; i++) {
			var message = messageArray[i];
			var messageRow = (React.createElement(MessageRow, {fullName: message.fullName, text: message.text}));
			messageDisplay.push(messageRow);
		}


		return(
			React.createElement("div", null, 
				React.createElement("li", null, 
					messageDisplay
				), 
				React.createElement(MessageSend, {url: this.props.url, convoID: this.props.convoID, handleMessageSubmit: this.refreshMessageList})
			)
		);
	}
});

var MessageSend = React.createClass({displayName: "MessageSend",
	getInitialState: function() {
    	return {text: ''};
  	},
  	onChange: function(e) {
    	this.setState({text: e.target.value});
  	},
  	handleSubmit: function(e) {
    	e.preventDefault();

    	var data = {
    		text: this.state.text
    	};
    	var urlPost = this.props.url + this.props.convoID;
    	$.ajax({
    		url: urlPost,
    		type:"POST",
    		dataType:"json",
    		data: data,
			success: function(messages) {
        		this.props.handleMessageSubmit(messages);
      		}.bind(this),
      		error: function(xhr,status,err){
        		console.log("Error: ", err);
      		}.bind(this)
    	});

    	var nextText = '';
    	this.setState({text: nextText});
  	},
	render: function () {
		return(
			React.createElement("div", {id: "sendMessage"}, 
				React.createElement("form", {onSubmit: this.handleSubmit}, 
					React.createElement("input", {onChange: this.onChange, value: this.state.text})
				)

			)
		);
	}
});


React.render(React.createElement(MessageList, {convoID: convoID, url: "/api/messages/"}), document.getElementById("message"));