var Comment = React.createClass({displayName: "Comment",
	render: function() {
		var displayAuthor;
		var isAnonymous = this.props.anonymous;
		if (isAnonymous) {
			displayAuthor = "Anonymous";
		} else {
			displayAuthor = this.props.author;
		}
		return(
			React.createElement("div", {className: "comment"}, 
       			React.createElement("p", null, React.createElement("em", null, displayAuthor), " says: ", this.props.children)
     		)
		);	
	}

})
var CommentBox = React.createClass({displayName: "CommentBox",
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
			React.createElement("div", null, 
				React.createElement("h4", null, "Comments"), 
				React.createElement(CommentList, {data: this.state.data}), 
				React.createElement(CommentForm, {onCommentSubmit: this.handleCommentSubmit})
			)
		);
	}

});

var CommentList = React.createClass({displayName: "CommentList",

	render: function() {
		var commentNodes = this.props.data.map(function (comment) {
      		return (
        	React.createElement(Comment, {author: comment.authorFullName, anonymous: comment.isAnonymous}, 
          		comment.text
        	)
      		);
    	});
    	return (
      		React.createElement("div", {className: "commentList"}, 
        	commentNodes
      		)
    	);
	}
});

var CommentForm = React.createClass({displayName: "CommentForm",
	handleSubmit: function(e) {
  	  	e.preventDefault();
   		var anonymousStatus = React.findDOMNode(this.refs.anonymous).value.trim();
   		console.log("Status: " +anonymousStatus);
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
			React.createElement("form", {className: "commentForm", onSubmit: this.handleSubmit}, 
				"Anonymous? ", React.createElement("input", {type: "checkbox", name: "anonymous", ref: "anonymous"}), 
        		React.createElement("input", {type: "text", placeholder: "Say something...", ref: "text"}), 
        		React.createElement("input", {type: "submit", value: "Post"})
      		)
		);
	}

});

var href=  window.location.href;
var user_id = href.substr(href.lastIndexOf('/') + 1);
var urlCall = "/api/comments/"+user_id;
React.render(React.createElement(CommentBox, {url: urlCall}), document.getElementById("commentForm"));