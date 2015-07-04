var React = require('react');
var GenericHeaderBarButton = require("./GenericHeaderBarButton");

var headerStyle = {
  

};


var GSMHeaderBar = React.createClass({displayName: "GSMHeaderBar",

  render: function() {
    return (
      React.createElement("div", {style: headerStyle}, 
        React.createElement("p", null, "Hello world!"), 
        React.createElement(GenericHeaderBarButton, {url: "http://tupleapp.com", displayName: "Experience Social"})
      )
    );
  }
});


module.exports = GSMHeaderBar;