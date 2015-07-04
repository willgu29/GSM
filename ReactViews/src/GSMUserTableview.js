
var UserImg = React.createClass({
  render: function() {

    return (

      <p>Name</p>
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


var tableStyle = {

  width: "100%"
}

var GSMUserTableView = React.createClass({

  render: function() {

    return(
      <table border="1" style={tableStyle} >
        <tr>
          <th>Name</th>
          <th>Skills</th>
          <th>Personality</th>
          <th>Interesting Facts</th>
        </tr>
        <tr>
          <td> <UserImg /> </td>
          <td> CSS, HTML </td>
          <td> INTP, Big Five Link </td>
          <td> Low-key paradoxical nerd. </td>
        </ tr>
     

      </table>

    );

  }
});

React.render(<GSMUserTableView />, document.body);
