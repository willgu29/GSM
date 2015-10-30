

var UserRow = React.createClass({

  render: function() {

    return(
      <div>
        <p>This Works!</p>
        <li key={this.props.index + this.props.itemText}>{this.props.itemText}</li>
      </div>
    );
  }
});

var ToDoList = React.createClass({

  render: function() {
    var createItem = function(itemText, index) {
      return <UserRow index={index} itemText={itemText} />
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
});

var ToDoApp = React.createClass({
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
  render: function() {
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onChange} value={this.state.text} />
          <button>Add Acquaintance</button>
        </form>
        <ToDoList items={this.state.items} />
      </div>
    );
  }
})

// React.render(<ToDoApp />, document.body);