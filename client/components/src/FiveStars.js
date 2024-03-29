
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
		return {rating: 5};
	},
	handleRatingSelected: function(rating) {
    	this.setState({rating: rating});
    	alert('Rating selected - ' + rating);
  },
	render: function() {
		return(
			<div>
        		Rating is {this.state.rating}<br/>
        		Clickable Rating <br/>
        		<StarImg value={this.state.rating} max="10" onRatingSelected={this.handleRatingSelected} />
        		<br />
        		Readonly rating <br/>
        		<StarImg value={this.state.rating} max="10" />
      		</div>

		);
	}

});

// React.render(<RatingStars />, document.body);



