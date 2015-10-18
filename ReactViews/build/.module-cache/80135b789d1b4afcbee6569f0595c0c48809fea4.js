//var Tooltip = require('rc-tooltip');
var groupStyle = {

    cursor: "pointer",
    width: "10%",
    height: "auto"
}


var CreateAccountForm = React.createClass({displayName: "CreateAccountForm",
    getInitialState: function() {
        return {help: false};
    },
    handleClick: function(event) {
        this.setState({help: !this.state.help});
    },
	render: function() {
        var helptext = this.state.help ? 'iGrouply is still in Alpha testing. To join, enter a valid group code if you\'re in a group. If you would like to start a group, email hi@igrouply.com' : '';
		return(	
			React.createElement("div", null, 
			React.createElement("h4", null, "New to iGrouply? Sign Up."), 
			 React.createElement("form", {className: "createAccountForm", method: "post", action: "createAccount"}, 
                "email: ", React.createElement("input", {type: "email", name: "email"}), " ", React.createElement("br", null), 
                "password: ", React.createElement("input", {type: "password", name: "password"}), " ", React.createElement("br", null), 
             	"first name: ", React.createElement("input", {type: "text", name: "firstName"}), " ", React.createElement("br", null), 
                "last name: ", React.createElement("input", {type: "text", name: "lastName"}), " ", React.createElement("br", null), 
                "phone number: ", React.createElement("input", {type: "tel", name: "phoneNumber"}), " ", React.createElement("br", null), 
                "group code:  ",  
                
                React.createElement("img", {src: "/public/imgs/InfoButtonBlack.png", style: groupStyle, onClick: this.handleClick}), 
                React.createElement("br", null), React.createElement("i", null, " ", helptext), React.createElement("br", null), 
                

                React.createElement("input", {type: "text", name: "initialGroupCode"}), " ", React.createElement("br", null), 

                React.createElement("br", null), 
                React.createElement("input", {type: "submit", value: "create account", id: "createAccount"})
            )
            )
             
		);
	} 
});

/*
//<Tooltip placement="right" trigger={['click','hover']} overlay={<span class='tooltip'>tooltip</span>}>
                <img src='/public/imgs/InfoButtonBlack.png' size='75%'/>
                //</Tooltip>
                */
React.render(React.createElement(CreateAccountForm, {url: "/createAccount"}), document.getElementById("createAccountForm"));


