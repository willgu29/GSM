"use strict";

var sideBar = {
  width: "90%",
  background: "white",

  /*boxShadow: "5px 5px 5px #888888",borderRadius: "10px",*/
  border: "1px solid black",
  marginBottom: "25px",

  marginTop: "200",
  marginLeft: "10",
  padding: "20"
};

var SideBarView = React.createClass({
  displayName: "SideBarView",

  render: function render() {
    return React.createElement(
      "div",
      { style: sideBar },
      React.createElement(
        "div",
        { "class": "card-block" },
        React.createElement(
          "h4",
          { "class": "card-title" },
          "SideBar title"
        ),
        React.createElement(
          "p",
          { "class": "card-text" },
          "Some quick example text to build on the card title and make up the bulk of the cards content."
        )
      ),
      React.createElement(
        "ul",
        { "class": "list-group list-group-flush" },
        React.createElement(
          "li",
          { "class": "list-group-item" },
          "Cras justo odio"
        ),
        React.createElement("hr", null),
        React.createElement(
          "li",
          { "class": "list-group-item" },
          "Dapibus ac facilisis in"
        ),
        React.createElement("hr", null),
        React.createElement(
          "li",
          { "class": "list-group-item" },
          "Vestibulum at eros"
        ),
        React.createElement("hr", null)
      ),
      React.createElement(
        "div",
        { "class": "card-block" },
        React.createElement(
          "a",
          { href: "#", "class": "card-link" },
          "Card link"
        ),
        " ",
        React.createElement(
          "a",
          { href: "#", "class": "card-link" },
          "Another link"
        )
      )
    );
  } });

React.render(React.createElement(SideBarView, null), document.getElementById("sideBarView"));