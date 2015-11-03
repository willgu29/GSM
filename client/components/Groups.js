'use strict'
import React from 'react'
import { Router, Route, Link } from 'react-router'

import GroupStore from "../stores/GroupStore";
import GroupActions from "../actions/GroupActions";

var BABURL = ["http://bruinappbuilders.com","http://facebook.com/groups/bruinappbuilders"];
var ACMURL = ["http://acm.cs.ucla.edu", "https://www.facebook.com/groups/uclaacm/"];
var SEPURL = ["http://ucla.sigmaetapi.com"];
var BEURL = ["http://www.bruinentrepreneurs.org"];
var BLURL = ["https://blackstonelaunchpad.org"];
var BMEURL = ["http://uclabme.squarespace.com/#about", "https://www.facebook.com/BruinMedicalEntrepreneurs/"];
module.exports = React.createClass({
	displayName:"Groups",
	getInitialState: function() {
		return GroupStore.getState();
	},
	componentDidMount: function() {
		GroupStore.listen(this.onChange);
		// GroupActions.getGroupsByCategory(this.props.params.categoryID);
	},
	componentWillUnmount: function() {
		GroupStore.unlisten(this.onChange);
	},
	onChange(state){
		this.setState(state);
	},
	render: function() {
		var displayArray = [];
		var groupsArray = this.state.groups;
		for (var i = 0; i < groupsArray.length; i++) {
			var group = groupsArray[i];
			displayArray.push(<li><GroupInformation groupName={group.name}
													shortName={group.shortName}
													groupDescription={group.description}
													model={group.membershipModel}
													groupURLS={group.urls} /></li>)
		}
		

		return(
			<div>
				<h3>{this.props.params.categoryID} Groups @ UCLA</h3>
				<ul>
					{displayArray}
				</ul>
			</div>
		);
	}
});

var GroupInformation = React.createClass({
	displayName:"GroupInfo",
	render: function() {

		var urls = this.props.groupURLS;
		var urlArray = [];
		for (var i = 0; i < urls.length; i++) {
			var url = urls[i];
			urlArray.push(<li>{url}</li>);
		};

		return(
			<div>
				<h4>{this.props.groupName}</h4>
				<p>{this.props.groupDescription}</p>
				<p>Membership model: {this.props.model} </p>
				<ul>
					{urlArray}
				</ul>
			</div>
		);
	}
});