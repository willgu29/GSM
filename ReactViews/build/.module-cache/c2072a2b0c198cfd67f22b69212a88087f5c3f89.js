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
				React.createElement(CommentForm, null)
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

	render: function() {
		return(
			React.createElement("form", {className: "commentForm"}, 
        		React.createElement("input", {type: "text", placeholder: "Your name"}), 
        		React.createElement("input", {type: "text", placeholder: "Say something..."}), 
        		React.createElement("input", {type: "submit", value: "Post"})
      		)
		);
	}

});

React.render(React.createElement(CommentBox, null), document.getElementById("commentForm"));