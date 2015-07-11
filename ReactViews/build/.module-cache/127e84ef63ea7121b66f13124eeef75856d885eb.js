

var UserRow = React.createClass({displayName: "UserRow",

  render: function() {

    return(
      React.createElement("div", null, 
        React.createElement("p", null, "This Works!"), 
        React.createElement("li", {key: this.props.index + this.props.itemText}, this.props.itemText)
      )
    );
  }
});

var ToDoList = React.createClass({displayName: "ToDoList",

  render: function() {
    var createItem = function(itemText, index) {
      return React.createElement(UserRow, {index: index, itemText: itemText})
    };
    return React.createElement("ul", null, this.props.items.map(createItem));
  }
});

var ToDoApp = React.createClass({displayName: "ToDoApp",
  getInitialState: function() {
    return {items: [], text: ''};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([this.state.text]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  },
  handleSave: function(e) {
    e.preventDefault();
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(arrayOfUsers){
      if (this.isMounted()){
        this.setState({users:arrayOfUsers});
      }
      }.bind(this),
      error: function(xhr,status,err){
        console.error(status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return(
      React.createElement("div", null, 
        React.createElement("form", {onSubmit: this.handleSubmit}, 
          React.createElement("input", {onChange: this.onChange, value: this.state.text}), 
          React.createElement("button", null, "Add Acquaintance")
        ), 
        React.createElement(ToDoList, {items: this.state.items}), 
        React.createElement("button", {onClick: this.handleSave}, "Save")
      )
    );
  }
})

React.render(React.createElement(ToDoApp, null), document.getElementById("gsmAddPeople"));