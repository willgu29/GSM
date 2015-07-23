var EditAccountForm = React.createClass({
    getInitialState: function() {
        return ({
            
            interesting: "",
            contactIf:  "",
            personality: [],
            skills: [],
            wants: [],
            canOffer: []

    
            
        });
    },
    componentDidMount: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(userData){
            if (this.isMounted()){
                this.setState({
                                interesting: userData.identity.interesting,
                                contactIf: userData.identity.contactIf,
                                personality: userData.identity.personality,
                                skills: userData.identity.skills,
                                canOffer: userData.identity.canOffer,
                                wants: userData.identity.wants
                                
                            
                        });
            }
            }.bind(this),
            error: function(xhr,status,err){
                console.error(status, err.toString());
            }.bind(this)
        });
     },
    handleChange: function(name, event) {
        var change = {};
        change[name] = event.target.value;
        this.setState(change);
    },
	render: function() {


		return(	
            <div>
			 <h3>Edit Account</h3>
			  <form className="editAccountForm" method="post" action="api/users/me" >
                    What can you offer people? (separate with commas only (no spaces)) <br /> 
                    <input id="canOffer" size="60" type="text" name="canOffer" value={this.state.canOffer} onChange={this.handleChange.bind(this, "canOffer")} /> <br />
                    <br />
                    What do you want? (separate with commas only (no spaces)) <br /> 
                    <input id="wants" size="60" type="text" name="wants" value={this.state.wants} onChange={this.handleChange.bind(this, "wants")} /> <br />
                    <br />
                    Why should someone contact you? <br /> 
                    <textarea id="contactIf" name="contactIf" value={this.state.contactIf} onChange={this.handleChange.bind(this, "contactIf")} cols="60" row="10" ></textarea> <br /><br />
                    <br />

                 	Add skills: (separate with commas only (no spaces)) <br /> 
                    <input id="skills" size="60" type="text" name="skills" value={this.state.skills} onChange={this.handleChange.bind(this, "skills")} /> <br />
                    <br />
                    Add personality traits: (separate with commas only (no spaces))  <br /> 
                    <input id="personality" size="60" type="text" name="personality" value={this.state.personality} onChange={this.handleChange.bind(this, "personality")} /> <br />
                    <br />
                    Tell us something interesting about yourself: <br /> 
                    <textarea id="interesting" name="interesting" value={this.state.interesting} onChange={this.handleChange.bind(this, "interesting")} cols="60" row="10" ></textarea> <br />
                    <br />
                    <input type="submit" value="edit account" id="editAccount" />
                </form>
            </div> 
		);
	} 
});

React.render(<EditAccountForm url="/api/users/me" />, document.getElementById("editAccountForm"));


