var firstTimeLogin = document.getElementById("isFirstTimeLogin").getAttribute("value");

var LoginUpdate = React.createClass({displayName: "LoginUpdate",

	componentDidMount: function() {
		//TODO: Update timestamp
		if (firstTimeLogin) {
			//TOOD: Join group via API and group ID code
			$.ajax({
				type: "POST",
				url: "/api/joinGroup/code",
    			dataType: 'json',
      			cache: false,
      			success: function(response){
      			
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
			React.createElement("p", null)
		);
	}

});

React.render(React.createElement(LoginUpdate, null), document.getElementById("loginUpdate"));


