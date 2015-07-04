

var UserRow = React.createClass({displayName: "UserRow",

  render: function() {

    return(

      React.createElement("p", null)
    );
  }
});

var ToDoList = React.createClass({displayName: "ToDoList",

  render: function() {

    return(
      React.createElement("p", null, "Hello")


    );
  }
});

var ToDoApp = React.createClass({displayName: "ToDoApp",
  getInitialState: function() {
    return {items: [], text: ''};
  },
  
  render: function() {
    return(
      React.createElement("div", null, 
        React.createElement("form", {onSubmit: this.handleSubmit}, 
          React.createElement("input", {onChange: this.onChange, value: this.state.text}), 
          React.createElement("button", null, "Add Acquaintance")
        ), 
        React.createElement(ToDoList, {items: this.state.items})
      )
    );
  }
})

React.render(React.createElement(ToDoApp, null), document.body);