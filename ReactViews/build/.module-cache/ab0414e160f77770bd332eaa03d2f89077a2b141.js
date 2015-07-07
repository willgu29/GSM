
//Tabular Data Columns

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

var PersonalityColumn = React.createClass({displayName: "PersonalityColumn",
  render: function() {

    var personalityArray = this.props.personality;

    var arrayOfPersonality = [];
    for (var i = 0 ; i < personalityArray.length; i++) {
      var personalityTrait = personalityArray[i];
 
      arrayOfPersonality.push(personalityTrait+" ");
    }
    return (
        React.createElement("p", null, arrayOfPersonality)
    );
  }

});

var ContactIfColumn = React.createClass({displayName: "ContactIfColumn",
  render: function() {

    return(
      React.createElement("p", null, this.props.contactIf)
    );
  }

});

var InterestingColumn = React.createClass({displayName: "InterestingColumn",
  render: function() {

    return(
      React.createElement("p", null, this.props.interesting)
    );
  }

});

var MoreInfoColumn = React.createClass({displayName: "MoreInfoColumn",
  render: function() {

    var nameNoSpace = this.props.firstName + this.props.lastName;

    return(
      React.createElement("a", {href: nameNoSpace}, "More Info")
    );
  }
});

/////

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
        React.createElement("td", null, React.createElement(PersonalityColumn, {personality: this.props.personality})), 
        React.createElement("td", null, React.createElement(ContactIfColumn, {contactIf: this.props.contactIf})), 
        React.createElement("td", null, React.createElement(InterestingColumn, {interesting: this.props.interesting})), 
        React.createElement("td", null, React.createElement(MoreInfoColumn, {firstName: this.props.firstName, lastName: this.props.lastName}))
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
 
      arrayOfUserRows.push(React.createElement(UserRow, {fullName: user.fullName, 
                                    skills: user.identity.skills, 
                                    personality: user.identity.personality, 
                                    contactIf: user.identity.contactIf, 
                                    interesting: user.identity.interesting, 
                                    firstName: user.firstName, 
                                    lastName: user.lastName}));
    }
    return(
      React.createElement("table", {border: "1", style: tableStyle}, 
        React.createElement("tr", null, 
          React.createElement("th", null, "Name"), 
          React.createElement("th", null, "Skills"), 
          React.createElement("th", null, "Personality"), 
          React.createElement("th", null, "Contact Me If.."), 
          React.createElement("th", null, "Interesting Facts"), 
          React.createElement("th", null, "More Info")
        ), 
        arrayOfUserRows
        
     

      )

    );

  }
});

React.render(React.createElement(GSMUserTableView, {url: "/api/users"}), document.getElementById("gsmUserTableView"));
