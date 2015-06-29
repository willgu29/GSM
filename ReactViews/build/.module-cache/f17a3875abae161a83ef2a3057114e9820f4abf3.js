var React = require('react');
var GenericHeaderBarButton = require("./GenericHeaderBarButton");

var headerStyle = {
  backgroundColor: "blue"

};


var GSMHeaderBar = React.createClass({displayName: "GSMHeaderBar",

  render: function() {
    return (
      React.createElement("div", {style: headerStyle}, 
        React.createElement("p", null, "Hello world!"), 
        React.createElement(GenericHeaderBarButton, {url: "http://tupleapp.com"}, "Re-experience Dining")
      )
    );
  }
});

//React.render(<GSMHeaderBar />, document.getElementById("headerBar"));

module.exports = GSMHeaderBar;