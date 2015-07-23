
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
    var displaySkills = skillsArray.join(", ");
    return (
        <p>{displaySkills}</p>
    );
  }

});

var PersonalityColumn = React.createClass({
  render: function() {

    var personalityArray = this.props.personality;

  
    var displayPersonality = personalityArray.join(", ");

    return (
        <p>{displayPersonality}</p>
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

var MoreInfoColumn = React.createClass({
  render: function() {

    var profileLink = "/users/" + this.props.email;

    return(
      <a href={profileLink}>More Info</a>
    );
  }
});

var CanOfferColumn = React.createClass({
  render: function() {

    var canOfferArray = this.props.canOffer;

    var displayCanOffer = canOfferArray.join(", ");
    return (
        <p>{displayCanOffer}</p>
    );
  }

});

var WantsColumn = React.createClass({
  render: function() {

    var wantsArray = this.props.wants;

    var displayWants = wantsArray.join(", ");
  
    return (
        <p>{displayWants}</p>
    );
  }

});

var ReputationColumn = React.createClass({
  render: function() {
    return(
      <a href={nameNoSpace}>Click</a>
    );
  }

})

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
        <td><WantsColumn wants={this.props.wants} /></td>
        <td><CanOfferColumn canOffer={this.props.canOffer} /></td>
        <td><ContactIfColumn contactIf={this.props.contactIf} /></td>
        <td><MoreInfoColumn email={this.props.email}  /></td>
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
 
      arrayOfUserRows.push(<UserRow fullName={user.fullName} 
                                    wants={user.identity.wants}
                                    canOffer={user.identity.canOffer}
                                    contactIf={user.identity.contactIf}
                                    email={user.email} />);
    }
    return(
      <table border="1" style={tableStyle} >
        <tr>
          <th>Name</th>
          <th>Wants</th>
          <th>Can Offer...</th>
          <th>Contact If...</th>
          <th>More Info</th>
        </tr>
        {arrayOfUserRows}
        
     

      </table>

    );

  }
});

React.render(<GSMUserTableView url="/api/users" />, document.getElementById("gsmUserTableView"));
