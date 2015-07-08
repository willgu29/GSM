var Comment = React.createClass({
	render: function() {
		var displayAuthor;
		var isAnonymous = this.props.anonymous;
		if (isAnonymous) {
			displayAuthor = "Anonymous";
		} else {
			displayAuthor = this.props.author;
		}
		return(
			<div className="comment">
       			<p><em>{displayAuthor}</em> says: {this.props.children}</p>
     		</div>
		);	
	}

})
var CommentBox = React.createClass({
	loadCommentsFromServer: function() {
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
	handleCommentSubmit: function(comment) {
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
      			this.loadCommentsFromServer();
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
		this.loadCommentsFromServer();
		//Don't need constant polling for now
    	//setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	},
	render: function() {
		return(
			<div>
				<h4>Comments</h4>
				<CommentList data={this.state.data} />
				<CommentForm onCommentSubmit={this.handleCommentSubmit} />
			</div>
		);
	}

});

var CommentList = React.createClass({

	render: function() {
		var commentNodes = this.props.data.map(function (comment) {
      		return (
        	<Comment author={comment.authorFullName} anonymous={comment.isAnonymous}>
          		{comment.text}
        	</Comment>
      		);
    	});
    	return (
      		<div className="commentList">
        	{commentNodes}
      		</div>
    	);
	}
});

var CommentForm = React.createClass({
	handleSubmit: function(e) {
  	  	e.preventDefault();
   		var anonymousStatus = React.findDOMNode(this.refs.anonymous).value.trim();
    	var text = React.findDOMNode(this.refs.text).value.trim();
    	if (!text) {
      		return;
    	}
    	this.props.onCommentSubmit({anonymous:anonymousStatus, text: text});
    	React.findDOMNode(this.refs.anonymous).value = '';
    	React.findDOMNode(this.refs.text).value = '';
    	return;
  },
	render: function() {
		return(
			<form className="commentForm" onSubmit={this.handleSubmit}>
				Anonymous? <input type="checkbox" id="anonymous" name="anonymous" ref="anonymous" />
        		<input type="text" placeholder="Say something..." ref="text" />
        		<input type="submit" value="Post" />
      		</form>
		);
	}

});

var href=  window.location.href;
var user_id = href.substr(href.lastIndexOf('/') + 1);
var urlCall = "/api/comments/"+user_id;
React.render(<CommentBox url={urlCall} />, document.getElementById("commentForm"));