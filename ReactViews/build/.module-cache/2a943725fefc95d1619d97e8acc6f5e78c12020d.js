
var UserImg = React.createClass({displayName: "UserImg",
  render: function() {

    return (

      React.createElement("p", null, this.props.fullName)
    );
  }
});

var SkillsColumn = React.createClass({displayName: "SkillsColumn",


  render: function() {

    var skillsArray = this.props.skills;
    var arrayOfSkills = [];
    for (var i = 0 ; i < skillsArray.length; i++) {
      var skill = skillsArray[i];
 
      arrayOfSkills.push(skill+" ");
    }
    return (
        React.createElement("p", null, arrayOfSkills)
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


var UserRow = React.createClass({displayName: "UserRow",
  
  render: function() {
    return(
      React.createElement("tr", null, 
        React.createElement("td", null, React.createElement(UserImg, {fullName: this.props.fullName})), 
        React.createElement("td", null, React.createElement(SkillsColumn, {skills: this.props.skills})), 
        React.createElement("td", null, "INTP, Big Five Link"), 
        React.createElement("td", null, "You want to get lunch/dinner or would like free tutoring in iOS. Also let me know if you would like to help with BAB"), 
        React.createElement("td", null, "Low-key paradoxical nerd.")
      )
    );
  }

});

var tableStyle = {

  width: "100%"
}

var GSMUserTableView = React.createClass({displayName: "GSMUserTableView",
  getInitialState:  function() {
    return ({users:[]});
  },
  componentDidMount: function() {
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
    var arrayOfUsers = this.state.users;
    var arrayOfUserRows = [];
    for (var i = 0 ; i < arrayOfUsers.length; i++) {
      var user = arrayOfUsers[i];
 
      arrayOfUserRows.push(React.createElement(UserRow, {fullName: user.fullName, skills: user.identity.skills}));
    }
    return(
      React.createElement("table", {border: "1", style: tableStyle}, 
        React.createElement("tr", null, 
          React.createElement("th", null, "Name"), 
          React.createElement("th", null, "Skills"), 
          React.createElement("th", null, "Personality"), 
          React.createElement("th", null, "Contact Me If.."), 
          React.createElement("th", null, "Interesting Facts")
        ), 
        arrayOfUserRows
        
     

      )

    );

  }
});

React.render(React.createElement(GSMUserTableView, {url: "/api/users"}), document.getElementById("gsmUserTableView"));
