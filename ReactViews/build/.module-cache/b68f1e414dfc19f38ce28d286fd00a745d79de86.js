var React = require('react');

var GenericHeaderBarButton = React.createClass({displayName: "GenericHeaderBarButton",
 
  render: function() {
    return (
      React.createElement("a", {href: this.props.url}, this.props.displayName)
    );
  }
});

module.exports = GenericHeaderBarButton;