
//Tabular Data Columns

var UserImg = React.createClass({
  render: function() {

    return (

      <p>{this.props.fullName}</p>
    );
  }
});

var SkillsColumn = React.createClass({


  render: function() {

    var skillsArray = this.props.skills;
    var arrayOfSkills = [];
    for (var i = 0 ; i < skillsArray.length; i++) {
      var skill = skillsArray[i];
 
      arrayOfSkills.push(skill+" ");
    }
    return (
        <p>{arrayOfSkills}</p>
    );
  }

});

var PersonalityColumn = React.createClass({
  render: function() {

    var personalityArray = this.props.personality;

    var arrayOfPersonality = [];
    for (var i = 0 ; i < personalityArray.length; i++) {
      var personalityTrait = personalityArray[i];
 
      arrayOfPersonality.push(personalityTrait+" ");
    }
    return (
        <p>{arrayOfPersonality}</p>
    );
  }

});

var ContactIfColumn = React.createClass({
  render: function() {

    return(
      <p>{this.props.contactIf}</p>
    );
  }

});

var InterestingColumn = React.createClass({
  render: function() {

    return(
      <p>{this.props.interesting}</p>
    );
  }

});

/////

var StarImg = React.createClass({
  
  render: function() {
    var items = [];
      for (var i = 1; i <= this.props.max; i++) {
          var clickHandler = this.props.onRatingSelected && this.props.onRatingSelected.bind(null, i);
          items.push(<li className={i <= this.props.value && 'filled'} onClick={clickHandler}>{'\u2605'}</li>);
      }
      return <ul className="rating">{items}</ul>;
    
  }

});

var RatingStars = React.createClass({
  getInitialState: function() {
    return {rating: 0};
  },
  handleRatingSelected: function(rating) {
      this.setState({rating: rating});
  },
  render: function() {
    return(
     
      <StarImg value={this.state.rating} max="5" onRatingSelected={this.handleRatingSelected} />

    );
  }

});


var UserRow = React.createClass({
  
  render: function() {
    return(
      <tr>
        <td><UserImg fullName={this.props.fullName} /></td>
        <td><SkillsColumn skills={this.props.skills} /></td>
        <td><PersonalityColumn personality={this.props.personality}/></td>
        <td><ContactIfColumn contactIf={this.props.contactIf} /></td>
        <td><InterestingColumn interesting={this.props.interesting} /></td>
      </tr>
    );
  }

});

var tableStyle = {

  width: "100%"
}

var GSMUserTableView = React.createClass({
  getInitialState:  function() {
    return ({users:[]});
  },
  componentWillMount: function() {
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
 
      arrayOfUserRows.push(<UserRow fullName={user.fullName} 
                                    skills={user.identity.skills} 
                                    personality={user.identity.personality} 
                                    contactIf={user.identity.contactIf}
                                    interesting={user.identity.interesting} />);
    }
    return(
      <table border="1" style={tableStyle} >
        <tr>
          <th>Name</th>
          <th>Skills</th>
          <th>Personality</th>
          <th>Contact Me If..</th>
          <th>Interesting Facts</th>
        </tr>
        {arrayOfUserRows}
        
     

      </table>

    );

  }
});

React.render(<GSMUserTableView url="/api/users" />, document.getElementById("gsmUserTableView"));
