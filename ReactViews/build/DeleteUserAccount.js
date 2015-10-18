'use strict';

var DeleteUserAccount = React.createClass({
	displayName: 'DeleteUserAccount',

	getInitialState: function getInitialState() {
		return { value: '' };
	},
	handleChange: function handleChange(event) {
		this.setState({ value: event.target.value });
	},
	handleClick: function handleClick(e) {
		e.preventDefault();
		$.ajax({
			url: this.props.url + this.state.value,
			type: 'DELETE',
			success: function success(result) {
				// Do something with the result
				console.log(result);
			}
		});
	},
	render: function render() {
		return React.createElement(
			'div',
			null,
			React.createElement(
				'h3',
				null,
				'Delete User: '
			),
			'User ID: ',
			React.createElement('br', null),
			React.createElement('input', { id: 'userID', name: 'userID', type: 'text', value: this.state.value, onChange: this.handleChange }),
			React.createElement('input', { onClick: this.handleClick, type: 'submit', value: 'delete user', id: 'deleteUser' })
		);
	}

});

React.render(React.createElement(DeleteUserAccount, { url: '/api/user/' }), document.getElementById("deleteUserAccount"));