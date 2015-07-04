var EditAccountForm = React.createClass({

	render: function() {
		return(	
			<div>
			<h4>Edit Account</h4>
			 <form className="editAccountForm" method="post" action="editAccount" >
             	Add skills: <input type="text" name="skills" placeholder="separate with commas only (no spaces)" /> <br />
                Add personality traits: <input type="text" name="personality" placeholder="separate with commas only (no spaces)" /> <br />
                Why should someone contact you? (things you want/things you can give perhaps) <input type="text" name="contactIf" placeholder="separate with commas only (no spaces)"/> <br />
                Tell us something interesting about yourself: <textarea name="interesting" cols="60" row="5" ></textarea> <br />
                <br />
                <input type="submit" value="edit account" id="editAccount" />
            </form>
            </div>
             
		);
	} 
});

React.render(<CreateAccountForm url="/editAccount" />, document.getElementById("editAccountForm"));


