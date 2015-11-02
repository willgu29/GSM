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
		GroupStore.getState();
	},
	componentDidMount: function() {
		GroupsStore.listen(this.onChange);
		GroupActions.getGroupsByCategory(this.props.params.categoryID)
	},
	componentWillUnmount: function() {
		GroupStore.unlisten(this.onChange);
	},
	onChange(state){
		this.setState(state);
	}
	render: function() {
		var displayArray = [];
		var groupsArray = this.state.groups;
		for (var i = 0; i < groupsArray.length; i++) {
			var group = groupsArray[i];
			displayArray.push(<li><GroupInformation groupName={group.name}
													shortName={group.shortName}
													groupDescription={group.description}
													model={group.membershipModel}
													groupURLS={group.urls})
		}
		if (this.props.params.categoryID == "tech") {
			displayArray.push(<li><GroupInformation groupName="Bruin App Builders (BAB)" groupDescription="Code apps"  model="Closed community, join FB group" groupURLs={BABURL} /></li>);
			displayArray.push(<li><GroupInformation groupName="Association of Computing Machinery (ACM)" groupDescription="Code apps" model="Event based, free for everyone"  groupURLs={ACMURL} /></li>);
		} else if (this.props.params.categoryID == "entrepreneurship") {
			displayArray.push(<li><GroupInformation groupName="Sigma Eta Pi (SEP)" groupDescription="Co-ed entrepreneurship fraternity" model="Fraternity. Recruiting again in Spring" groupURLs={SEPURL}/></li>);
			displayArray.push(<li><GroupInformation groupName="Bruin Entrepreneurs (BE)" groupDescription="Undergraduate Entrepreneurship" model="Event based, free for everyone" groupURLs={BEURL}/></li>);
			displayArray.push(<li><GroupInformation groupName="Blackstone Launchpad" groupDescription="Training the next generation of entrepreneurs" model="Program and mentorship-based, check website" groupURLs={BLURL}/></li>);
			displayArray.push(<li><GroupInformation groupName="Bruin Medical Entrepreneurs (BME)" groupDescription="Healthcare based entrepreneurship" model="Event based, free for everyone" groupURLs={BMEURL}/></li>);

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

		var urls = this.props.groupURLs;
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