
var GenericHeaderBarButton = React.createClass({displayName: "GenericHeaderBarButton",
 
  render: function() {
    return (
      React.createElement("a", {href: this.props.url}, this.props.displayName)
    );
  }
});


React.render(React.createElement(GenericHeaderBarButton, null), document.getElementById('headerBarButton'));
