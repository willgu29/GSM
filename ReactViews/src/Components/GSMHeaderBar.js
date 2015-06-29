var React = require('react');
var GenericHeaderBarButton = require("./GenericHeaderBarButton");

var headerStyle = {
  backgroundColor: "blue"

};


var GSMHeaderBar = React.createClass({

  render: function() {
    return (
      <div style={headerStyle}>
        <p>Hello world!</p>
        <GenericHeaderBarButton url="http://tupleapp.com" displayName="Experience Social" />
      </div>
    );
  }
});

//React.render(<GSMHeaderBar />, document.getElementById("headerBar"));

module.exports = GSMHeaderBar;