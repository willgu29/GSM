var ulStyle = {
    listStyleType: "none",
    margin: "0",
    padding: "0"
}
var liStyle = {
    display: "inline",
    marginRight: "20"
}

var liStyleSelected = {
	display: "inline",
	backgroundColor: "yellow",
	marginRight: "20"
}


var GSMNavBarItems = React.createClass({
	
	render: function() {
		var style1 = liStyle;
		var style2 = liStyle;
		var style3 = liStyle;
		var style4 = liStyle;
		if (this.props.currentURL == "/") {
			style1 = liStyleSelected;
		} else if (this.props.currentURL == "/messages") {
			style2 = liStyleSelected;
		} else if (this.props.currentURL == "/groups") {
			style3 = liStyleSelected;
		} else if (this.props.currentURL == "/editAccount") {
			style4 = liStyleSelected;
		}
		return(
			<ul style={ulStyle}>
				<li style={style1}><a href="/">Member List</a></li>
				<li style={style2}><a href="/messages">Messages</a></li>
				<li style={style3}><a href="/groups">Groups</a></li>
				<li style={style4}><a href="/editAccount">Edit Profile</a></li>


			</ul>
		);
	}

});



var GSMHeader = React.createClass({

	render: function() {
		return(
			<div id="navBar">
				<h1>iGrouply</h1>
				<GSMNavBarItems currentURL={this.props.currentURL} />
			</div>
		);
	}
});


var pathName = window.location.pathname;

React.render(<GSMHeader currentURL={pathName} />, document.getElementById("gsmHeader"));