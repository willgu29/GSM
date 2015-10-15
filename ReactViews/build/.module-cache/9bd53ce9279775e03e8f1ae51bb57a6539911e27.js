var convoID = document.getElementById("convoID").getAttribute("value");

var convoTitle = document.getElementById("convoTitle").getAttribute("value");

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

	loadMessages: function() {
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
	componentDidMount: function() {
		this.loadMessages();
	},
	refreshMessageList: function() {
		this.loadMessages();
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
				React.createElement("h3", null, "Conversation with ", this.props.convoTitle), 
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
    	return {text: '',
    			emails: []};
  	},
  	onChange: function(e) {
    	this.setState({text: e.target.value});
  	},
  	componentDidMount: function() {
  		$.ajax({
    		url: "/api/messageThread/" + this.props.convoID,
    		type:"GET",
    		dataType: "json",
    		success: function(messageThread) {
    			this.setState({emails: messageThread.participant_emails});
    		}.bind(this),
    		error: function(xhr,status,err){
    			console.log("Error: ", err);
    		}.bind(this)
    	});
  	},
  	handleSubmit: function(e) {
    	e.preventDefault();

    	var data = {
    		text: this.state.text
    	};
    	//create message
    	var urlPost = this.props.url + this.props.convoID;
    	$.ajax({
    		url: urlPost,
    		type:"POST",
    		dataType:"json",
    		data: data,
			success: function(messages) {
        		this.props.handleMessageSubmit();
      		}.bind(this),
      		error: function(xhr,status,err){
        		console.log("Error: ", err);
      		}.bind(this)
    	});

    	
    	var emailData = {
    		emails: this.state.emails,
    		text: this.state.text
    	};
    	//
    	console.log(emailData);
    	$.ajax({
    		url: "/api/sendMailTo/",
    		type: "POST",
    		dataType:"json",
    		data: emailData,
    		success: function(response) {
        		
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


React.render(React.createElement(MessageList, {convoTitle: convoTitle, convoID: convoID, url: "/api/messages/"}), document.getElementById("message"));