'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
var LoginActions = require('../actions/LoginActions');
var LinkedStateMixin = require('react-addons-linked-state-mixin');


var errorStyle = {

	color: "red"
}

var LoginForm = React.createClass({
	getInitialState: function() {
		return ({loginStatus: "",
					email:"",
					password:""});
	},
	handleSubmit: function(e) {
		e.preventDefault();

		var email = this.state.email;
		var password = this.state.password;
		var data = {
			email: this.state.email,
			password: this.state.password
		};
		console.log(data);
		LoginActions.tryLogin(email,password);

	},
	handleChangeEmail: function(e) {
		this.setState({email:e.target.value});
	},
	handleChangePassword: function(e) {
		this.setState({password:e.target.value});
	},
	render: function() {
		var errorMessage;
		if (this.state.loginStatus == "") {
			errorMessage = "";
		} else {
			errorMessage = <p style={errorStyle}>{this.state.loginStatus}</p>;
		}

		var email = this.state.email;
		var password = this.state.password;
		return(
			<div>
				<h4>Login </h4>
				{errorMessage}
				<form onSubmit={this.handleSubmit} className="loginForm" method="post" action="login" >
         		 email: <input onChange={this.handleChangeEmail} type="email" name="email" value={email} /> <br />
          		password: <input onChange={this.handleChangePassword} type="password" name="password"  value={password} /> <br />
          		<br />
          		<input type="submit" value="login" id="login" />
        		</form>
			</div>
		);
	}
})


var groupStyle = {

    cursor: "pointer",
    width: "2%",
    height: "auto"
}



var CreateAccountForm = React.createClass({
	mixins: [LinkedStateMixin],
    getInitialState: function() {
        return {help: false,
        		email: "",
        		password: "",
        		firstName: "",
        		lastName: "",
        		phoneNumber: "",
        		initialGroupCode: "BABRocks"};
    },
    handleClick: function(event) {
        this.setState({help: !this.state.help});
    },
    handleCreateAccount: function(e) {
    	e.preventDefault();
    	LoginActions.createAccount(this.state.email,
    								this.state.password,
    								this.state.phoneNumber,
    								this.state.firstName,
    								this.state.lastName,
    								this.state.initialGroupCode);
    },
	render: function() {
        var helptext = this.state.help ? 'iGrouply is still in Alpha testing. To join, enter a valid group code if you\'re in a group. If you would like to start a group, email hi@igrouply.com' : '';
		return(	
			<div>
			<h4>New to iGrouply? Sign Up.</h4>
			 <form className="createAccountForm" method="post" action="createAccount" >
                email: <input type="email" name="email" valueLink={this.linkState('email')} /> <br />
                password: <input type="password" name="password" valueLink={this.linkState('password')} /> <br />
             	first name: <input type="text" name="firstName" valueLink={this.linkState('firstName')} /> <br />
                last name: <input type="text" name="lastName" valueLink={this.linkState('lastName')} /> <br />
                phone number: <input type="tel" name="phoneNumber"valueLink={this.linkState('phoneNumber')}  /> <br />
                group code:&nbsp;&nbsp; 
                
                <img src='./client/assets/images/infoButtonBlack.png' style={groupStyle} onClick={this.handleClick}/>
                <br/><i> {helptext}</i><br/>
                

                <input type="text" name="initialGroupCode" valueLink={this.linkState('initialGroupCode')} /> <br />

                <br />
                <input onClick={this.handleCreateAccount} type="submit" value="create account" id="createAccount" />
            </form>
            </div>
             
		);
	} 
});

module.exports = React.createClass({
	render: function() {
		return (

				<div id="landingPage">
    
    		<div className='container-fluid top'>
    			<div className='row'>
 					<div className="col-md-1"></div> 
    					<div className="col-md-3">
    					<div className="header">
						<div className='header-logo'>iGrouply</div>
					<br/><p></p>
					<p className='header-content'><br/>Discover your network.
							<ul id="valueProp">
								<li>Find people who can help you with your projects and goals</li>
								<li>Offer your skills and help other people</li>
								<li>Message and meet interesting people</li>
								<li>UCLA (and BAB) Exclusive</li>
							</ul>
						</p>

				</div>
			</div>
			<div className="col-md-2 login">

			    <LoginForm />
			    <hr/>

			    <CreateAccountForm />
			</div>
		</div>
	</div>

</div>

		);
	}


})