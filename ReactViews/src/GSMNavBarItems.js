

var GSMNavBarItems = React.createClass({

	render: function() {
		return(
			<ul>
				<li><a href="/editAccount">Edit Account</a></li>
			</ul>
		);
	}

});

//        		<li><a href="/messages">Messages</a></li>


React.render(<GSMNavBarItems />, document.getElementById("gsmNavBarItems"));