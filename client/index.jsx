
'use strict'
import ReactDOM from 'react-dom'
import { Router, Route, Link } from 'react-router'

var LoginStore = require('./stores/LoginStore');

var LandingPage = require("./components/LandingPage");

var GSMHeader = require('./components/GSMHeader');
var GSMUserTableView = require("./components/GSMUserTableView");
var Message = require('./components/Message');
var EditAccount = require('./components/EditAccountForm');
var GSMUserProfile = require("./components/GSMUserProfile");

var pathName = window.location.pathname;


const App = React.createClass({
	getInitialState: function() {
		return LoginStore.getState();
	},
	componentDidMount: function() {
		LoginStore.listen(this.onChange);
	},
	componentWillUnmount: function() {
		LoginStore.unlisten(this.onChange);
	},
	onChange(state) {
		console.log("Change state: index: state: " + JSON.stringify(state));
		this.setState(state);
	},
	render: function() {

		var content = [];
		console.log("State: " + this.state.isLoggedIn);
		if (this.state.isLoggedIn) {
			content.push(<GSMHeader />);
			if (window.location.pathname == "/") {
				content.push(<GSMUserTableView />);
			}
		} else {
			//landing page
			content.push(<LandingPage />);
		}

		return(
			<div>
				{content}
				{this.props.children}
			</div>
		);
	}
});

ReactDOM.render((<Router>
				<Route path="/" component={App}>
					<Route path="/users/:id" component={GSMUserProfile} />
					<Route path="/editAccount" component={EditAccount} />
					<Route path="/messages" component={Message} />
				</Route>
			</Router>
			), document.getElementById("content"));



        	

