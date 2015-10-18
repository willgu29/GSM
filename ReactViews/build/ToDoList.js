'use strict';

var UserRow = React.createClass({
  displayName: 'UserRow',

  render: function render() {

    return React.createElement(
      'div',
      null,
      React.createElement(
        'p',
        null,
        'This Works!'
      ),
      React.createElement(
        'li',
        { key: this.props.index + this.props.itemText },
        this.props.itemText
      )
    );
  }
});

var ToDoList = React.createClass({
  displayName: 'ToDoList',

  render: function render() {
    var createItem = function createItem(itemText, index) {
      return React.createElement(UserRow, { index: index, itemText: itemText });
    };
    return React.createElement(
      'ul',
      null,
      this.props.items.map(createItem)
    );
  }
});

var ToDoApp = React.createClass({
  displayName: 'ToDoApp',

  getInitialState: function getInitialState() {
    return { items: [], text: '' };
  },
  onChange: function onChange(e) {
    this.setState({ text: e.target.value });
  },
  handleSubmit: function handleSubmit(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([this.state.text]);
    var nextText = '';
    this.setState({ items: nextItems, text: nextText });
  },
  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'form',
        { onSubmit: this.handleSubmit },
        React.createElement('input', { onChange: this.onChange, value: this.state.text }),
        React.createElement(
          'button',
          null,
          'Add Acquaintance'
        )
      ),
      React.createElement(ToDoList, { items: this.state.items })
    );
  }
});

React.render(React.createElement(ToDoApp, null), document.body);