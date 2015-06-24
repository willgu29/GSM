var React = require('react'),
  GenericHeaderBarButton = require("./GenericHeaderBarButton");

var headerStyle = {
  backgroundColor: "blue"

};


var GSMHeaderBar = React.createClass({
  displayName: 'BlueBird',
 
  render: function() {
    return (
      React.createElement("div", {style: headerStyle}, 
        React.createElement("p", null, "Hello world!"), 
        React.createElement(GenericHeaderBarButton, {url: "http://tupleapp.com"}, "Re-experience Dining")
      )
    );
  }
});

React.render(React.createElement(GSMHeaderBar, null), document.getElementById("headerBar"));

//module.exports = GSMHeaderBar;