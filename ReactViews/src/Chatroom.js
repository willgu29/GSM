var Message = React.createClass({
	render: function() {

		return(
			<div className="message">
       			<p><em>{this.props.author}</em>: {this.props.children}</p>
     		</div>
		);	
	}

})
var MessageBox = React.createClass({
	loadMessagesFromServer: function() {
		console.log("URL:"+ this.props.url);
		$.ajax({
      		url: this.props.url,
      		dataType: 'json',
      		cache: false,
      		success: function(data) {
        		this.setState({data: data});
      		}.bind(this),
      		error: function(xhr, status, err) {
       			console.error(this.props.url, status, err.toString());
      		}.bind(this)
    	});
	},
	handleMessageSubmit: function(comment) {
		//Instant comment load... don't need this for now
		// var comments = this.state.data;
  //   	var newComments = comments.concat([comment]);
  //   	this.setState({data: newComments});
    	$.ajax({
      		url: this.props.url,
      		dataType: 'json',
      		type: 'POST',
      		data: comment,
      		success: function(data) {
      			this.loadMessagesFromServer();
        		// this.setState({data: data});
      		}.bind(this),
      		error: function(xhr, status, err) {
        		console.error(this.props.url, status, err.toString());
      		}.bind(this)
    	});
  	},
	getInitialState: function() {
		return ({data: []});
	},
	componentDidMount: function() {
		this.loadMessagesFromServer();
		//Don't need constant polling for now
    	//setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	},
	render: function() {
		return(
			<div>
				<h4>Comments</h4>
				<MessageList data={this.state.data} />
				<MessageForm onCommentSubmit={this.handleCommentSubmit} />
			</div>
		);
	}

});

var MessageList = React.createClass({

	render: function() {
		var messageNodes = this.props.data.map(function (message) {
      		return (
        	<Message author={message.authorFullName}>
          		{message.text}
        	</Message>
      		);
    	});
    	return (
      		<div className="messageList">
        	{messageNodes}
      		</div>
    	);
	}
});

var MessageForm = React.createClass({
	handleSubmit: function(e) {
  	  	e.preventDefault();

    	var text = React.findDOMNode(this.refs.text).value.trim();
    	if (!text) {
      		return;
    	}
    	React.findDOMNode(this.refs.text).value = '';
    	return;
  },
	render: function() {
		return(
			<form className="messageForm" onSubmit={this.handleSubmit}>
        		<input type="text" size="60" placeholder="Say something positive/negative..." ref="text" />
        		<input type="submit" value="Post" />
      		</form>
		);
	}

});

var href=  window.location.href;
var user_id = href.substr(href.lastIndexOf('/') + 1);
var urlCall = "/api/message/"+user_id;
React.render(<MessageBox url={urlCall} />, document.getElementById("chatroom"));