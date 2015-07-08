var Comment = React.createClass({displayName: "Comment",
	render: function() {
		var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
		return(
			React.createElement("div", {className: "comment"}, 
        		React.createElement("h2", {className: "commentAuthor"}, 
        			this.props.author
        		), 
       			React.createElement("span", {dangerouslySetInnerHTML: {__html: rawMarkup}})
     		)
		);	
	}

})
var CommentBox = React.createClass({displayName: "CommentBox",
	loadCommentsFromServer: function() {
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
    	// TODO: submit to the server and refresh the list
  	},
	getInitialState: function() {
		return ({data: []});
	},
	componentDidMount: function() {
		this.loadCommentsFromServer();
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
        	React.createElement(Comment, {author: comment.author}, 
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
			React.createElement("form", {className: "commentForm"}, 
				React.createElement("input", {type: "checked", placeholder: "Anonymous?", ref: "anonymous"}), 
        		React.createElement("input", {type: "text", placeholder: "Say something...", ref: "text"}), 
        		React.createElement("input", {type: "submit", value: "Post"})
      		)
		);
	}

});

React.render(React.createElement(CommentBox, null), document.getElementById("commentForm"));