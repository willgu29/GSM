var LoginForm = React.createClass({

	handleSubmit: function(e) {
		if (!this.validate) {
			e.preventDefault();
		}
		alert("HI");
	},

	render: function() {
		return(
			<div>
				<form className="loginForm" onsubmit={this.handleSubmit} method="post">
                    Email: <input type="text" name="email" /> <br />
                    Password: <input type="password" name="password" /> <br />
                    <input type="submit" value="Login" id="login" />
                </form>
			</div>
		);
	}
})

React.render(<LoginForm />, document.body);

//Wht. This should be in handleLoginSubmit... there is voodoo shit going on.
/* $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
    */