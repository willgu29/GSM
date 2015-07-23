var ulStyle = {
    listStyleType: "none",
    margin: "0",
    padding: "0"
}
var liStyle = {
    display: "inline"
}

var liStyleSelected = {
	display: "inline",
	backgroundColor: "green"
}

var GSMNavBarItems = React.createClass({
	
	render: function() {
		var style1 = liStyle;
		var style2 = liStyle;
		if (this.props.currentURL == "/") {
			style1 = liStyleSelected;
		} else if (this.props.currentURL == "/editAccount") {
			style2 = liStyleSelected;
		}
		return(
			<ul style={ulStyle}>
				<li style={style1}><a href="/">Member List</a></li>
				<li style={style2}><a href="/editAccount">Edit Account</a></li>
			</ul>
		);
	}

});

//        		<li><a href="/messages">Messages</a></li>

var pathName = window.location.pathname;

React.render(<GSMNavBarItems currentURL={pathName} />, document.getElementById("gsmNavBarItems"));