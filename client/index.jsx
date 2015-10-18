
'use strict'
import React from 'react'
import { Router, Route, Link } from 'react-router'

var Hello = require('./Hello');

const App = React.createClass({
	render() {
		return(
			<p>Hello world!</p>
		);
	}
});

React.render((<Router>
				<Route path="/" component={App} />
				<Route />
			</Router>
			), document.getElementById("content"));


//React.render(<Hello />, document.getElementById('content'))

