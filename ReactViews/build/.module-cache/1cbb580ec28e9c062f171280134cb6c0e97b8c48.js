
var GenericHeaderBarButton = React.createClass({displayName: "GenericHeaderBarButton",
 
  render: function() {
    return (
    	React.createElement("p", null, "Helllloooooo", 
      React.createElement("a", {href: this.props.url}, this.props.displayname)
      )
    );
  }
});


React.render(React.createElement(GenericHeaderBarButton, null), document.getElementById('headerBarButton'));
