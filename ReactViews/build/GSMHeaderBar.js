
//May not need this

var headerStyle = {
  backgroundColor: "blue"

};

var HeaderLink = React.createClass({displayName: "HeaderLink",
 
  render: function() {
    return (
      React.createElement("a", {href: this.props.url}, this.props.displayName)
    );
  }
});



var GSMHeaderBar = React.createClass({displayName: "GSMHeaderBar",

  render: function() {
    return (
      React.createElement("div", {style: headerStyle}, 
        React.createElement("p", null, "Hello world!"), 
        React.createElement(HeaderLink, {url: "/", displayName: "Experience Social"}), 
        React.createElement(HeaderLink, {url: "/me", displayName: "Me"}), 
        React.createElement(HeaderLink, {url: "/about", displayName: "About"})

      )
    );
  }
});


React.render(React.createElement(GSMHeaderBar, null), document.body);
