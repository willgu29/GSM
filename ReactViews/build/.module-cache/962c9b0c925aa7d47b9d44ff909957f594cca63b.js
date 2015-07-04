
var StarImg = React.createClass({displayName: "StarImg",
  
  render: function() {
    var items = [];
      for (var i = 1; i <= this.props.max; i++) {
          var clickHandler = this.props.onRatingSelected && this.props.onRatingSelected.bind(null, i);
          items.push(React.createElement("li", {class: i <= this.props.value && 'filled', onClick: clickHandler}, '\u2605'));
      }
      return React.createElement("ul", {class: "rating"}, items);
    
  }

});

var RatingStars = React.createClass({displayName: "RatingStars",
  getInitialState: function() {
    return {rating: 5};
  },
  handleRatingSelected: React.autoBind(function(rating) {
      this.setState({rating: rating});
      alert('Rating selected - ' + rating);
    }),
  render: function() {
    return(
      React.createElement("div", null, 
            "Rating is ", this.state.rating, React.createElement("br", null), 
            "Clickable Rating ", React.createElement("br", null), 
            React.createElement(StarImg, {value: this.state.rating, max: "10", onRatingSelected: this.handleRatingSelected}), 
            React.createElement("br", null), 
            "Readonly rating ", React.createElement("br", null), 
            React.createElement(StarImg, {value: this.state.rating, max: "10"})
          )

    );
  }

});

var UserRow = React.createClass({displayName: "UserRow",

  render: function() {

    return(
      React.createElement("div", null, 
      React.createElement(RatingStars, null), 
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