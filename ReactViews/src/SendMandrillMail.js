
var SendMailForm = React.createClass({
	getInitialState: function() {
		return ({htmlPreview:""});
	},
	handleChange: function(name, event) {
        
		//TODO: Update html preview
        //var change = {};
        //change[name] = event.target.value;
        //this.setState(change);
    },


    //Track opens default yes, track clicks default yes, auto_text default yes,
    //preserve_recipients NO, merge_language Handlebars, 
	render: function() {
		return(
			<form method="post" action="/admin/sendMail">
				Subject: <input type="text" id="subject" name="subject" /> <br />
				HTML Text: <textarea id="html" name="html" onChange={this.handleChange.bind(this, "html")} 
				cols="60" row="10" ></textarea> <br />
				From Email: <input type="text" id="from_email" name="from_email" /> <br />
				From Name: <input type="text" id="from_name" name="from_name" /> <br />
				To: (Separate multiple with commas (no spaces)): <br />
				<input type="text" id="to_email" name="to_email" /> <br />
				Tags: (Separate multiple with commas (no spaces)): <br />
				<input type="text" id="tags" name="tags" /> <br />
				<input type="submit" value="Submit" id="sendMail" />


			</form>
		);
	}

});


var SendMail = React.createClass({
	render: function() {
		return(
			<SendMailForm />
		);
	}

});

React.render(<SendMail />, document.getElementById("sendMandrillMail"));