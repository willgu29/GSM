
var UserImg = React.createClass({displayName: "UserImg",
  render: function() {

    return (

      React.createElement("p", null, "Name")
    );
  }
});

var StarImg = React.createClass({displayName: "StarImg",
  
  render: function() {
    var items = [];
      for (var i = 1; i <= this.props.max; i++) {
          var clickHandler = this.props.onRatingSelected && this.props.onRatingSelected.bind(null, i);
          items.push(React.createElement("li", {className: i <= this.props.value && 'filled', onClick: clickHandler}, '\u2605'));
      }
      return React.createElement("ul", {className: "rating"}, items);
    
  }

});

var RatingStars = React.createClass({displayName: "RatingStars",
  getInitialState: function() {
    return {rating: 0};
  },
  handleRatingSelected: function(rating) {
      this.setState({rating: rating});
  },
  render: function() {
    return(
     
      React.createElement(StarImg, {value: this.state.rating, max: "5", onRatingSelected: this.handleRatingSelected})

    );
  }

});

var GSMUserTableView = React.createClass({displayName: "GSMUserTableView",

  render: function() {

    return(
      React.createElement("table", null, 
        React.createElement("tr", null, 
          React.createElement("td", null, 
            React.createElement(UserImg, null)
          )
        ), 
        React.createElement("tr", null, 
          React.createElement("td", null, 
            React.createElement(RatingStars, null)
          )
        )


      )

    );

  }
});

React.render(React.createElement(GSMUserTableView, null), document.body);
