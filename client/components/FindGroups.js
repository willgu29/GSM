'use strict'
import React from 'react'
import { Router, Route, Link } from 'react-router'

module.exports = React.createClass({
	displayName:"FindGroups",
	render: function() {
		return(
			<div>
				<h3>Find Groups by Category</h3>
				<ul>
					<li><Link to="/find/groups/Tech">Tech</Link></li>
					<li><Link to="/find/groups/Entrepreneurship">Entrepreneurship</Link></li>

				</ul>
				{this.props.children}
			</div>
		);
	}
});

//TODO: Events way later