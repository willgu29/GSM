
'use strict'
import ReactDOM from 'react-dom'
import { Router, Route, Link } from 'react-router'

var LoginStore = require('./stores/LoginStore');

var LandingPage = require("./LandingPage/LandingPage");

var GSMHeader = require('./Mixins/GSMHeader');
var GSMUserTableView = require("./GSMUserTableView");
var Hello = require('./Hello');
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
		console.log("Change state: index: state: " + state);
		this.setState(state);
	},
	render: function() {

		var content = [];

		if (this.state.isLoggedIn) {
			//Display tableview and shit
						//<GSMNavBar currentURL={pathName} />
			content.push(<GSMHeader />);
			content.push(<GSMUserTableView />);
		} else {
			//landing page
			content.push(<LandingPage />);
		}

		return(
			<div>
				<ul>
          		<li><Link to="/">Home</Link></li>
          		<li><Link to="/editAccount">My Profile</Link></li>
          		<li><Link to="/groups">Groups</Link></li>


        		</ul>
				{content}
				{this.props.children}
			</div>
		);
	}
});

ReactDOM.render((<Router>
				<Route path="/" component={App}>
					<Route path="/editAccount" component={EditAccount} />
					<Route path="/groups" component={Hello} />
					<Route path="/messages" component={Message} />
				</Route>
			</Router>
			), document.getElementById("content"));



        	

