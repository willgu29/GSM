var EditAccountForm = React.createClass({

	render: function() {
		return(	
			<div>
			<h4>Edit Account</h4>
			 <form className="editAccountForm" method="put" action="api/users/me" >
             	Add skills: <br /> 
                <input size="60" type="text" name="skills" placeholder="separate with commas only (no spaces)" /> <br />
                <br />
                Add personality traits: <br /> 
                <input size="60" type="text" name="personality" placeholder="separate with commas only (no spaces)" /> <br />
                <br />
                Why should someone contact you? (things you want/things you can give perhaps) <br /> 
                <input size="60" type="text" name="contactIf" placeholder="separate with commas only (no spaces)"/> <br />
                <br />
                Tell us something interesting about yourself: <br /> 
                <textarea name="interesting" cols="60" row="10" ></textarea> <br />
                <br />
                <input type="submit" value="edit account" id="editAccount" />
            </form>
            </div>
             
		);
	} 
});

React.render(<EditAccountForm url="/api/users/me" />, document.getElementById("editAccountForm"));


