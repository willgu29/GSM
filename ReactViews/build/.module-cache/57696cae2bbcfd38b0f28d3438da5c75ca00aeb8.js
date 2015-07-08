var CommentForm = React.createClass({displayName: "CommentForm",

	render: function() {
		return(
			React.createElement("p", null, "YOU WANT COMMENTS? LOL ")
		);
	}

});

React.render(React.createElement(CommentForm, null), document.getElementById("commentForm"));