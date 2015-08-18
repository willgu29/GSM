var convoID = document.getElementById("convoID").getAttribute("value");


var MessageList = React.createClass({
	render: function (){
		return(
			<p>HI</p>
		);
	}
});



React.render(<MessageList convoID={convoID} />, document.getElementById("message"));