"use strict";

var CreateAccountForm = React.createClass({
  displayName: "CreateAccountForm",

  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h4",
        null,
        "New here? Sign Up."
      ),
      React.createElement(
        "form",
        { className: "createAccountForm", method: "post", action: "createAccount" },
        "email: ",
        React.createElement("input", { type: "email", name: "email" }),
        " ",
        React.createElement("br", null),
        "password: ",
        React.createElement("input", { type: "password", name: "password" }),
        " ",
        React.createElement("br", null),
        "first name: ",
        React.createElement("input", { type: "text", name: "firstName" }),
        " ",
        React.createElement("br", null),
        "last name: ",
        React.createElement("input", { type: "text", name: "lastName" }),
        " ",
        React.createElement("br", null),
        "phone: ",
        React.createElement("input", { type: "tel", name: "phoneNumber" }),
        " ",
        React.createElement("br", null),
        "group code: ",
        React.createElement("img", { src: "/public/imgs/infobutton.png" }),
        " ",
        React.createElement("input", { type: "text", name: "initialGroupCode" }),
        " ",
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement("input", { type: "submit", value: "create account", id: "createAccount" })
      )
    );
  }
});

React.render(React.createElement(CreateAccountForm, { url: "/createAccount" }), document.getElementById("createAccountForm"));