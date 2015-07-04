


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
  handleRatingSelected: function(rating) {
      this.setState({rating: rating});
      alert('Rating selected - ' + rating);
  },
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

var GSMUserTableView = React.createClass({displayName: "GSMUserTableView",

  render: function() {

    return(
      React.createElement("table", null, 
        React.createElement("tr", null, 
          React.createElement("td", null, "Name")
        ), 
        React.createElement("tr", null, 

          React.createElement(RatingStars, null)
        )

      )

    );

  }
});

React.render(React.createElement(GSMUserTableView, null), document.body);
