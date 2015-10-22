
'use strict'
import ReactDOM from 'react-dom'
import { Router, Route, Link } from 'react-router'

var LoginStore = require('./stores/LoginStore');

var LandingPage = require("./LandingPage/LandingPage");

var GSMHeader = require('./Mixins/GSMHeader');
var GSMUserTableView = require("./GSMUserTableView");
var Message = require('./Message');
var EditAccount = require('./EditAccountForm');
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
			console.log("what");
			content.push(<GSMHeader />);
			content.push(<GSMUserTableView />);
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
					<Route path="/editAccount" component={EditAccount} />
					<Route path="/groups" component={Message} />
					<Route path="/messages" component={Message} />
				</Route>
			</Router>
			), document.getElementById("content"));



        	

