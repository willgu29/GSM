'use strict'
import React from 'react'
import { Router, Route, Link } from 'react-router'

import GroupActions from "../actions/GroupActions";

module.exports = React.createClass({
	displayName:"FindGroups",
	handleClick: function(categoryID) {
		GroupActions.getGroupsByCategory(categoryID);
	},
	render: function() {
		return(
			<div>
				<h3>Find Groups by Category</h3>
				<ul>
					<li><Link onClick={this.handleClick.bind(this,"tech")} to="/find/groups/tech">Tech</Link></li>
					<li><Link onClick={this.handleClick.bind(this, "entrepreneurship")} to="/find/groups/entrepreneurship">Entrepreneurship</Link></li>

				</ul>
				{this.props.children}
			</div>
		);
	}
});

