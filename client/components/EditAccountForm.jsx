'use strict'
import React from 'react'
var $ = require('jquery');

module.exports = React.createClass({
    getInitialState: function() {
        return ({
            
            interesting: "",
            topFiveTime:  "",
            personality: [],
            skills: [],
            wants: [],
            canOffer: []

    
            
        });
    },
    componentDidMount: function() {
        $.ajax({
            url: "localhost:3000/api/users/me",
            dataType: 'jsonp',
            cache: false,
            success: function(userData){
            if (this.isMounted()){               
                this.setState({
                                interesting: userData.identity.interesting,
                                topFiveTime: userData.identity.topFiveTime,
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
             <p>Be sure to click edit account below to save your profile.</p>
			  <form className="editAccountForm" method="post" action="api/users/me" >

                    Top 5 things you spend your time on: (be specific) <br /> 
                    <textarea id="topFiveTime" name="topFiveTime" value={this.state.topFiveTime} onChange={this.handleChange.bind(this, "topFiveTime")} cols="60" row="10" ></textarea> <br /><br />
                    <br />

                    What do you want that others can help with? (separate with commas only (no spaces)) <br /> 
                    <input id="wants" size="60" type="text" name="wants" value={this.state.wants} onChange={this.handleChange.bind(this, "wants")} /> <br />
                    <br />
                    What can you offer people? (separate with commas only (no spaces)) <br /> 
                    <input id="canOffer" size="60" type="text" name="canOffer" value={this.state.canOffer} onChange={this.handleChange.bind(this, "canOffer")} /> <br />
                    <br />
                    
                   
                    
                 	
                    
                    <input type="submit" value="save changes" id="save changes" />
                </form>
            </div> 
		);
	} 
});

// React.render(<EditAccountForm url="/api/users/me" />, document.getElementById("editAccountForm"));

/* Previous form prompts

Add skills: (separate with commas only (no spaces)) <br /> 
                    <input id="skills" size="60" type="text" name="skills" value={this.state.skills} onChange={this.handleChange.bind(this, "skills")} /> <br />
                    <br />
                    Add personality traits: (separate with commas only (no spaces))  <br /> 
                    <input id="personality" size="60" type="text" name="personality" value={this.state.personality} onChange={this.handleChange.bind(this, "personality")} /> <br />
                    <br />
                    Tell us something interesting about yourself: <br /> 
                    <textarea id="interesting" name="interesting" value={this.state.interesting} onChange={this.handleChange.bind(this, "interesting")} cols="60" row="10" ></textarea> <br />
                    <br />

                    */
