var UserActions = require("../actions/UserActions");


var helpTextStyle = {
  fontSize: "14px",
  display: "inline"
}


var searchStyle = {
  marginLeft: "25px",
  marginBottom: "25px"
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



module.exports = React.createClass({
  getInitialState: function() {
    return ({infoText:"",
			searchText: ""});
  },
  handleInfoClick: function() {
    if (this.state.infoText == "") {
      this.setState({infoText:" Search by keywords (name, skills, activities, etc). Search nothing to see everyone."});
    } else {
      this.setState({infoText:""});
    }
  },
  handleChange: function(e) {
    e.preventDefault();
    var searchText = e.target.value.trim();
    this.setState({searchText:searchText})
  },
  handleSubmit: function(e) {
  	e.preventDefault();
  	UserActions.searchUsersByKeyword(this.state.searchText);

  },

  

  render: function() {

    var helpText = <p style={helpTextStyle} >{this.state.infoText}</p>
    return(
      <div>
        
        
        <form onSubmit={this.handleSubmit} className="searchForm"  style={searchStyle} method="get" action="/api/searchUsers/" >
         <input type="text" name="searchText" onChange={this.handleChange} cols="100" placeholder="Search by name, wants, skills..."/>
         <input style={infoButton} type="submit" value="Search" />
         <br/>
        </form>
        </div>
    );
  }

});