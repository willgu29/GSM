var JoinGroupForm = React.createClass({

  render: function () {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h4",
        null,
        "Join Group"
      ),
      React.createElement(
        "form",
        { className: "joinGroupForm", method: "post", action: "/api/joinGroup/none" },
        "Group ID: ",
        React.createElement("input", { type: "text", name: "groupID" }),
        " ",
        React.createElement("br", null),
        "User ID: ",
        React.createElement("input", { type: "text", name: "userID" }),
        " ",
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement("input", { type: "submit", value: "join group", id: "joinGroup" })
      )
    );
  }
});

ReactDOM.render(React.createElement(JoinGroupForm, { url: "/api/joinGroup/none" }), document.getElementById("joinGroupForm"));