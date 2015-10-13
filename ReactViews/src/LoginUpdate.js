var firstTimeLogin = document.getElementById("isFirstTimeLogin").getAttribute("value");

var LoginUpdate = React.createClass({

	componentDidMount: function() {
		//TODO: Update timestamp
		console.log("Mount");
		if (firstTimeLogin) {
			console.log("LOG 1");
			//TOOD: Join group via API and group ID code
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

React.render(<LoginUpdate />, document.getElementById("loginUpdate"));


