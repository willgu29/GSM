//var Tooltip = require('rc-tooltip');
var groupStyle = {

    cursor: "pointer",
    width: "10%",
    height: "auto"
}


var CreateAccountForm = React.createClass({
    getInitialState: function() {
        return {help: false};
    },
    handleClick: function(event) {
        this.setState({help: !this.state.help});
    },
	render: function() {
        var helptext = this.state.help ? 'iGrouply is still in Alpha testing. To join, enter a valid group code if you\'re in a group. If you would like to start a group, email hi@igrouply.com' : '';
		return(	
			<div>
			<h4>New to iGrouply? Sign Up.</h4>
			 <form className="createAccountForm" method="post" action="createAccount" >
                email: <input type="email" name="email" /> <br />
                password: <input type="password" name="password" /> <br />
             	first name: <input type="text" name="firstName" /> <br />
                last name: <input type="text" name="lastName" /> <br />
                phone number: <input type="tel" name="phoneNumber" /> <br />
                group code:&nbsp;&nbsp; 
                
                <img src='/public/imgs/InfoButtonBlack.png' style={groupStyle} onClick={this.handleClick}/>
                <br/><i> {helptext}</i><br/>
                

                <input type="text" name="initialGroupCode" /> <br />

                <br />
                <input type="submit" value="create account" id="createAccount" />
            </form>
            </div>
             
		);
	} 
});

/*
//<Tooltip placement="right" trigger={['click','hover']} overlay={<span class='tooltip'>tooltip</span>}>
                <img src='/public/imgs/InfoButtonBlack.png' size='75%'/>
                //</Tooltip>
                */
React.render(<CreateAccountForm url="/createAccount" />, document.getElementById("createAccountForm"));


