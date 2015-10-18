"use strict";

var EditAccountForm = React.createClass({
    displayName: "EditAccountForm",

    getInitialState: function getInitialState() {
        return {

            interesting: "",
            topFiveTime: "",
            personality: [],
            skills: [],
            wants: [],
            canOffer: []

        };
    },
    componentDidMount: function componentDidMount() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: (function (userData) {
                if (this.isMounted()) {
                    this.setState({
                        interesting: userData.identity.interesting,
                        topFiveTime: userData.identity.topFiveTime,
                        personality: userData.identity.personality,
                        skills: userData.identity.skills,
                        canOffer: userData.identity.canOffer,
                        wants: userData.identity.wants

                    });
                }
            }).bind(this),
            error: (function (xhr, status, err) {
                console.error(status, err.toString());
            }).bind(this)
        });
    },
    handleChange: function handleChange(name, event) {
        var change = {};
        change[name] = event.target.value;
        this.setState(change);
    },
    render: function render() {

        return React.createElement(
            "div",
            null,
            React.createElement(
                "h3",
                null,
                "Edit Account"
            ),
            React.createElement(
                "p",
                null,
                "Be sure to click edit account below to save your profile."
            ),
            React.createElement(
                "form",
                { className: "editAccountForm", method: "post", action: "api/users/me" },
                "Top 5 things you spend your time on: (be specific) ",
                React.createElement("br", null),
                React.createElement("textarea", { id: "topFiveTime", name: "topFiveTime", value: this.state.topFiveTime, onChange: this.handleChange.bind(this, "topFiveTime"), cols: "60", row: "10" }),
                " ",
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("br", null),
                "What do you want that others can help with? (separate with commas only (no spaces)) ",
                React.createElement("br", null),
                React.createElement("input", { id: "wants", size: "60", type: "text", name: "wants", value: this.state.wants, onChange: this.handleChange.bind(this, "wants") }),
                " ",
                React.createElement("br", null),
                React.createElement("br", null),
                "What can you offer people? (separate with commas only (no spaces)) ",
                React.createElement("br", null),
                React.createElement("input", { id: "canOffer", size: "60", type: "text", name: "canOffer", value: this.state.canOffer, onChange: this.handleChange.bind(this, "canOffer") }),
                " ",
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("input", { type: "submit", value: "save changes", id: "save changes" })
            )
        );
    }
});

React.render(React.createElement(EditAccountForm, { url: "/api/users/me" }), document.getElementById("editAccountForm"));

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