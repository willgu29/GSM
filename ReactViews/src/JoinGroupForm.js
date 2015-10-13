var JoinGroupForm = React.createClass({

	render: function() {
		return(	
			<div>
			<h4>Join Group</h4>
			 <form className="joinGroupForm" method="post" action="/api/joinGroup/none" >
                Group ID: <input type="text" name="groupID" /> <br />

                <br />
                <input type="submit" value="join group" id="joinGroup" />
            </form>
            </div>
             
		);
	} 
});

React.render(<JoinGroupForm url="/api/joinGroup/none" />, document.getElementById("joinGroupForm"));