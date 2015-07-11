

var UserRow = React.createClass({

  render: function() {

    return(
      <div>
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

var GSMAddPeople = React.createClass({
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
      success: function(status){
      if (this.isMounted()){

      }
      }.bind(this),
      error: function(xhr,status,err){
        console.error(status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          Enter first name and last name: <br />
          <input onChange={this.onChange} value={this.state.text} />
          <button>Add Acquaintance</button>
        </form>
        <ToDoList items={this.state.items} />
        <button onClick={this.handleSave} >Save</button>
      </div>
    );
  }
})

React.render(<GSMAddPeople saveURL="/api/network/me" />, document.getElementById("gsmAddPeople"));