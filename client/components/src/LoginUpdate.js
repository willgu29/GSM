var firstTimeLogin = document.getElementById("isFirstTimeLogin").getAttribute("value");

var LoginUpdate = React.createClass({

	componentDidMount: function() {
		if (firstTimeLogin) {
			//Join group based on code
			$.ajax({
				type: "POST",
				url: "/api/joinGroup/code",
    			dataType: 'json',
      			cache: false,
      			success: function(response){
      				console.log(response);
      			}.bind(this),
      			error: function(xhr,status,err){
        			console.error(status, err.toString());
      			}.bind(this)

			});
			//update time stamp last login
			$.ajax({
				type: "POST",
				url: "/api/updateLoginDate",
    			dataType: 'json',
      			cache: false,
      			success: function(response){
      				console.log(response);
      			}.bind(this),
      			error: function(xhr,status,err){
        			console.error(status, err.toString());
      			}.bind(this)

			});
			
		} else {
			//Do nothing
		}
	},
	render: function() {
		return (
			<p></p>
		);
	}

});

// React.render(<LoginUpdate />, document.getElementById("loginUpdate"));


