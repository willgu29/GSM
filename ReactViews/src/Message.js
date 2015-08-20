var convoID = document.getElementById("convoID").getAttribute("value");

var MessageRow = React.createClass({

	render: function() {
		return(
			<ul>{this.props.fullName}: {this.props.text}</ul>
		);
	}

});

var MessageList = React.createClass({
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
		for (var i = 0; i < messageArray; i++) {
			var message = messageArray[i];
			var messageRow = (<MessageRow fullName={message.fullName} text={message.text} />);
			messageDisplay.push(messageRow);
		}


		return(
			<div>
				<li>
					{messageDisplay}
				</li>
				<MessageSend url={this.props.url} convoID={this.props.convoID} handleMessageSubmit={this.refreshMessageList} />
			</div>
		);
	}
});

var MessageSend = React.createClass({
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
			<div id="sendMessage">
				<form onSubmit={this.handleSubmit}>
					<input onChange={this.onChange} value={this.state.text} />
				</form>

			</div>
		);
	}
});


React.render(<MessageList convoID={convoID} url="/api/messages/" />, document.getElementById("message"));