
var UserImg = React.createClass({
  render: function() {

    return (

      <p>{this.props.fullName}</p>
    );
  }
});

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
        <td>CSS,HTML</td>
        <td>INTP, Big Five Link</td>
        <td>You want to get lunch/dinner or would like free tutoring in iOS. Also let me know if you would like to help with BAB</td>
        <td>Low-key paradoxical nerd.</td>
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
 
      arrayOfUserRows.push(<UserRow fullName={user.fullName} />);
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
