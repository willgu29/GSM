import React from 'react'

import { Router, Route, Link } from 'react-router'

const App = React.createClass({
	render() {
		return(
			<p>Hello world!</p>
		);
	}
});

React.render((<Router>
				<Route path="/" component={App}>
				<Route />
			</Router>
			), document.getElementById("app"));