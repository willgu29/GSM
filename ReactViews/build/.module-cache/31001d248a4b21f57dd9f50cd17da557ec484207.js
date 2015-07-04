
var headerStyle = {
  backgroundColor: "blue"

};


var GSMHeaderBar = React.createClass({displayName: "GSMHeaderBar",

  render: function() {
    return (
      React.createElement("div", {style: headerStyle}, 
        React.createElement("p", null, "Hello world!")
      )
    );
  }
});


React.render(React.createElement(GSMHeaderBar, null), document.getElementById('headerBar'));
