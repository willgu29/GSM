var React = require('react');
var GSMHeaderBar = require('../GSMHeaderBar');

var Hi = React.createClass({displayName: "Hi",
	render: function() {
		return (
			React.createElement(GSMHeaderBar, null)
		);
	}
});

module.exports = Hi;
