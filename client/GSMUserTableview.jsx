'use strict'
import React from 'react'
var $ = require('jquery');
var helpTextStyle = {
  fontSize: "14px",
  display: "inline"
}
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
  minHeight: "225px",
  /*height: "auto",*/
  overflow: "auto",
  boxShadow: "0px 0px 2px #999999",
  /*border: "1px solid black",*/
  marginBottom: "25px",
  background: "white",
  /*borderRadius: "25px"*/
}

var cardText = {
  float: "left",
  marginLeft: "20px",
  fontFamily: "Avenir, sans-serif",
  fontSize: "16px",
  /*fontWeight: "bold",*/
  width: "80%",
  clear: "both",
  marginBottom: "10px"
  
}

var moreInfoStyle = {
  float: "right",
  lineHeight: "50",
  marginBottom: "25"
}

var cardHeader = {
/*  background: "#eee",*/
  /*height: "50px",*/
  display: "inline",
  lineHeight: "50px",
  /*marginLeft: "10px",*/
  
  marginTop: "10px",
  /*paddingTop: "15",*/
  fontFamily: "Avenir"

}

var cardHeaderText = {
  marginLeft: "15px",
  fontSize: "32px",
  fontWeight: "200",
  lineHeight: "50px",
  fontFamily: "Avenir Book",
  color: "hsl(281, 100%, 29%)"
  /*marginTop: "20px"*/

}

var profStyle = {
  clear: "both",
  float: "right",
  fontSize: "16px",
  marginTop: "20px",
  marginRight: "20px"


}

var searchStyle = {
  marginLeft: "25px",
  marginBottom: "25px"
}

//Tabular Data Columns

var UserImg = React.createClass({
  render: function() {

    return (

      <p>{this.props.fullName}</p>
    );
  }
});


var TopFiveTimeColumn = React.createClass({

  render: function() {
    return(
      <p>{this.props.topFiveTime}</p>
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


var MoreInfoColumn = React.createClass({
  render: function() {

    var profileLink = "/users/" + this.props._id;

    return(
      <a href={profileLink} style={profStyle}>More Info</a>
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





var SearchBar = React.createClass({
  getInitialState: function() {
    return ({infoText:""});
  },
  handleInfoClick: function() {
    if (this.state.infoText == "") {
      this.setState({infoText:" Search by keywords (name, skills, activities, etc). Search nothing to see everyone."});
    } else {
      this.setState({infoText:""});
    }
  },
  handleSubmit: function(e) {
    e.preventDefault();

    var searchTerm = React.findDOMNode(this.refs.searchText).value.trim();
    var searchURL = this.props.url+searchTerm;
    $.ajax({
      url: searchURL,
      dataType: 'json',
      success: function(data) {
        this.props.handleChange(data);
      }.bind(this),
      error: function(xhr,status,err){
        console.log("Error: ", err);
      }.bind(this)
    });
  },

  

  render: function() {

    var helpText = <p style={helpTextStyle} >{this.state.infoText}</p>
    return(
      <div>
        
        
        <form onSubmit={this.handleSubmit} className="searchForm"  style={searchStyle} method="get" action="/api/searchUsers/" >
         <input type="text" name="searchText" ref="searchText" cols="100" placeholder=" Search by name, wants, skills..."/>
         <input style={infoButton} type="submit" value="Search" />
         <br/>
        </form>
        </div>
    );
  }

});
//<button type="button" style={infoButton} onClick={this.handleInfoClick}>Info</button> 
///****************


var UserRow = React.createClass({
  
  render: function() {

    var arrayWants = this.props.wants.join(", ");
    var arrayCanOffer = this.props.canOffer.join(", ");

    return(
      <div style={cardStyle}>
        <div style={cardHeader}><h3 style={cardHeaderText}>{this.props.fullName}<MoreInfoColumn _id={this.props._id} style={moreInfoStyle} /></h3></div>
      
        <p style={cardText}>Wants: {arrayWants}</p>
        <br/><br/>
        <p style={cardText}>Can Offer: {arrayCanOffer}</p>
        
        
      </div>
     
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
module.exports = React.createClass({
  displayName: "GSMTableView",
  getInitialState:  function() {
    return ({users:[]});
  },
  componentDidMount: function() {
    $.ajax({
      url: "/api/users",
      dataType: 'jsonp',
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
  handleChange: function(users) {
    this.setState({users:users});
  },

  render: function() {
    var arrayOfUsers = this.state.users;
    var arrayOfUserRows = [];
    for (var i = 0 ; i < arrayOfUsers.length; i++) {
      var user = arrayOfUsers[i];
 
      arrayOfUserRows.push(<UserRow fullName={user.fullName} 
                                    topFiveTime={user.identity.topFiveTime}
                                    wants={user.identity.wants}
                                    canOffer={user.identity.canOffer}
                                    _id={user._id} />);
    }
    return(
      <div>
      <SearchBar url="/api/searchUsers/" handleChange={this.handleChange} /> 
      {arrayOfUserRows}
      </div>

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

// React.render(<GSMUserTableView url="/api/users/" />, document.getElementById("gsmUserTableView"));
