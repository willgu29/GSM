var LinkView = React.createClass({displayName: "LinkView",

	render: function() {
		return(
			React.createElement("a", {href: this.props.url}, this.props.displayName)
		);
	}
});


React.render(React.createElement(LinkView, {url: "/createAccout", displayName: "Edit Account"}), document.getElementById("link"));