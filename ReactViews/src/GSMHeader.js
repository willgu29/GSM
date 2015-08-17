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
		var style3 = liStyle;
		if (this.props.currentURL == "/") {
			style1 = liStyleSelected;
		} else if (this.props.currentURL == "/editAccount") {
			style2 = liStyleSelected;
		} else if (this.props.currentURL == "/messages") {
			style3 = liStyleSelected;
		}
		return(
			<ul style={ulStyle}>
				<li style={style1}><a href="/">Member List</a></li>
				<li style={style2}><a href="/editAccount">Edit Account</a></li>
				<li style={style3}><a href="/messages">Messages</a></li>

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