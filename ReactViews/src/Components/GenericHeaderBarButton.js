var React = require('react');

var GenericHeaderBarButton = React.createClass({
 
  render: function() {
    return (
      <a href={this.props.url}>{this.props.children}</a>
    );
  }
});

module.exports = GenericHeaderBarButton;