"use strict";

var helpTextStyle = {
  fontSize: "14px",
  display: "inline"
};
var infoButton = {
  display: "inline",
  padding: "6px 12px",
  marginBottom: "0",
  fontSize: "14px",
  fontWeight: "normal",
  lineHeight: "1.42857143",
  textAlign: "center",
  whiteSpace: "nowrap",
  verticalAlign: "middle",
  cursor: "pointer",
  backgroundImage: "none",
  border: "1px solid transparent",
  borderRadius: "4px",
  color: "#fff",
  background: "green",
  borderColor: "#46b8da",
  marginLeft: "10"

};

var cardStyle = {
  width: "90%",
  marginLeft: "25px",
  minHeight: "300px",
  /*height: "auto",*/
  overflow: "auto",
  boxShadow: "0px 0px 2px #999999",
  /*border: "1px solid black",*/
  marginBottom: "25px",
  background: "white"
};

/*borderRadius: "25px"*/
var cardText = {
  float: "left",
  marginLeft: "20px",
  fontFamily: "Avenir, sans-serif",
  fontSize: "16px",
  /*fontWeight: "bold",*/
  width: "80%",
  clear: "both",
  marginBottom: "10px"

};

var moreInfoStyle = {
  float: "right",
  lineHeight: "50",
  marginBottom: "25"
};

var cardHeader = {
  /*  background: "#eee",*/
  /*height: "50px",*/
  display: "inline",
  lineHeight: "50px",
  /*marginLeft: "10px",*/

  marginTop: "10px",
  /*paddingTop: "15",*/
  fontFamily: "Avenir"

};

var cardHeaderText = {
  marginLeft: "15px",
  fontSize: "32px",
  fontWeight: "200",
  lineHeight: "50px",
  fontFamily: "Avenir Book",
  color: "hsl(281, 100%, 29%)"
  /*marginTop: "20px"*/

};

var profStyle = {
  clear: "both",
  float: "right",
  fontSize: "16px",
  marginTop: "20px",
  marginRight: "20px"

};

var searchStyle = {
  marginLeft: "25px",
  marginBottom: "25px"
};

//Tabular Data Columns

var UserImg = React.createClass({
  displayName: "UserImg",

  render: function render() {

    return React.createElement(
      "p",
      null,
      this.props.fullName
    );
  }
});

var SkillsColumn = React.createClass({
  displayName: "SkillsColumn",

  render: function render() {

    var skillsArray = this.props.skills;
    var displaySkills = skillsArray.join(", ");
    return React.createElement(
      "p",
      null,
      displaySkills
    );
  }

});

var PersonalityColumn = React.createClass({
  displayName: "PersonalityColumn",

  render: function render() {

    var personalityArray = this.props.personality;

    var displayPersonality = personalityArray.join(", ");

    return React.createElement(
      "p",
      null,
      displayPersonality
    );
  }

});

var TopFiveTimeColumn = React.createClass({
  displayName: "TopFiveTimeColumn",

  render: function render() {
    return React.createElement(
      "p",
      null,
      this.props.topFiveTime
    );
  }
});

var ContactIfColumn = React.createClass({
  displayName: "ContactIfColumn",

  render: function render() {

    return React.createElement(
      "p",
      null,
      this.props.contactIf
    );
  }

});

var InterestingColumn = React.createClass({
  displayName: "InterestingColumn",

  render: function render() {

    return React.createElement(
      "p",
      null,
      this.props.interesting
    );
  }

});

var MoreInfoColumn = React.createClass({
  displayName: "MoreInfoColumn",

  render: function render() {

    var profileLink = "/users/" + this.props._id;

    return React.createElement(
      "a",
      { href: profileLink, style: profStyle },
      "More Info"
    );
  }
});

var CanOfferColumn = React.createClass({
  displayName: "CanOfferColumn",

  render: function render() {

    var canOfferArray = this.props.canOffer;

    var displayCanOffer = canOfferArray.join(", ");
    return React.createElement(
      "p",
      null,
      displayCanOffer
    );
  }

});

var WantsColumn = React.createClass({
  displayName: "WantsColumn",

  render: function render() {

    var wantsArray = this.props.wants;

    var displayWants = wantsArray.join(", ");

    return React.createElement(
      "p",
      null,
      displayWants
    );
  }

});

var ReputationColumn = React.createClass({
  displayName: "ReputationColumn",

  render: function render() {
    return React.createElement(
      "a",
      { href: nameNoSpace },
      "Click"
    );
  }

});

/////

var StarImg = React.createClass({
  displayName: "StarImg",

  render: function render() {
    var items = [];
    for (var i = 1; i <= this.props.max; i++) {
      var clickHandler = this.props.onRatingSelected && this.props.onRatingSelected.bind(null, i);
      items.push(React.createElement(
        "li",
        { className: i <= this.props.value && 'filled', onClick: clickHandler },
        "★"
      ));
    }
    return React.createElement(
      "ul",
      { className: "rating" },
      items
    );
  }

});

var RatingStars = React.createClass({
  displayName: "RatingStars",

  getInitialState: function getInitialState() {
    return { rating: 0 };
  },
  handleRatingSelected: function handleRatingSelected(rating) {
    this.setState({ rating: rating });
  },
  render: function render() {
    return React.createElement(StarImg, { value: this.state.rating, max: "5", onRatingSelected: this.handleRatingSelected });
  }

});

var SearchBar = React.createClass({
  displayName: "SearchBar",

  getInitialState: function getInitialState() {
    return { infoText: "" };
  },
  handleInfoClick: function handleInfoClick() {
    if (this.state.infoText == "") {
      this.setState({ infoText: " Search by keywords (name, skills, activities, etc). Search nothing to see everyone." });
    } else {
      this.setState({ infoText: "" });
    }
  },
  handleSubmit: function handleSubmit(e) {
    e.preventDefault();

    var searchTerm = React.findDOMNode(this.refs.searchText).value.trim();
    var searchURL = this.props.url + searchTerm;
    $.ajax({
      url: searchURL,
      dataType: 'json',
      success: (function (data) {
        this.props.handleChange(data);
      }).bind(this),
      error: (function (xhr, status, err) {
        console.log("Error: ", err);
      }).bind(this)
    });
  },

  render: function render() {

    var helpText = React.createElement(
      "p",
      { style: helpTextStyle },
      this.state.infoText
    );
    var results = '';
    return React.createElement(
      "div",
      null,
      React.createElement(
        "form",
        { onSubmit: this.handleSubmit, className: "searchForm", style: searchStyle, method: "get", action: "/api/searchUsers/" },
        React.createElement("input", { type: "text", name: "searchText", ref: "searchText", cols: "100", placeholder: " Search by name, wants, skills..." }),
        React.createElement("input", { style: infoButton, type: "submit", value: "Search" }),
        React.createElement("br", null)
      ),
      { results: results }
    );
  }

});
//<button type="button" style={infoButton} onClick={this.handleInfoClick}>Info</button>
///****************

var UserRow = React.createClass({
  displayName: "UserRow",

  render: function render() {
    return React.createElement(
      "div",
      { style: cardStyle },
      React.createElement(
        "div",
        { style: cardHeader },
        React.createElement(
          "h3",
          { style: cardHeaderText },
          this.props.fullName,
          React.createElement(MoreInfoColumn, { _id: this.props._id, style: moreInfoStyle })
        )
      ),
      React.createElement(
        "p",
        { style: cardText },
        "Wants: ",
        this.props.wants
      ),
      React.createElement("br", null),
      React.createElement("br", null),
      React.createElement(
        "p",
        { style: cardText },
        "Can Offer: ",
        this.props.canOffer
      )
    );
  }

});
/*<a href="#" class="card-link">Another link</a>*/
/*
 <tr>
   <td><UserImg fullName={this.props.fullName} /></td>
   <td><WantsColumn wants={this.props.wants} /></td>
   <td><CanOfferColumn canOffer={this.props.canOffer} /></td>
   <td><MoreInfoColumn _id={this.props._id}  /></td>
 </tr>
 */
var GSMUserTableView = React.createClass({
  displayName: "GSMUserTableView",

  getInitialState: function getInitialState() {
    return { users: [] };
  },
  componentDidMount: function componentDidMount() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: (function (arrayOfUsers) {
        if (this.isMounted()) {
          this.setState({ users: arrayOfUsers });
        }
      }).bind(this),
      error: (function (xhr, status, err) {
        console.error(status, err.toString());
      }).bind(this)
    });
  },
  handleChange: function handleChange(users) {
    this.setState({ users: users });
  },

  render: function render() {
    var arrayOfUsers = this.state.users;
    var arrayOfUserRows = [];
    for (var i = 0; i < arrayOfUsers.length; i++) {
      var user = arrayOfUsers[i];

      arrayOfUserRows.push(React.createElement(UserRow, { fullName: user.fullName,
        topFiveTime: user.identity.topFiveTime,
        wants: user.identity.wants,
        canOffer: user.identity.canOffer,
        _id: user._id }));
    }
    return React.createElement(
      "div",
      null,
      React.createElement(SearchBar, { url: "/api/searchUsers/", handleChange: this.handleChange }),
      arrayOfUserRows
    );
  }
});
/* old

return(
      <div id="tableView">
      <SearchBar url="/api/searchUsers/" handleChange={this.handleChange} />
      /*
      <table border="1" className="table table-striped" >
        <tr>
          <th>Name</th>
          <th>Wants</th>
          <th>Can Offer</th>
          <th>More Info</th>
        </tr>
        
        {arrayOfUserRows}
        
     

      </table>
      </div>

*/

React.render(React.createElement(GSMUserTableView, { url: "/api/users/" }), document.getElementById("gsmUserTableView"));