var SubmitMediaForm = React.createClass({displayName: "SubmitMediaForm",
	getInitialState: function() {
		return ({mediaLink: ""});
	},
	handleChange: function(event) {
		event.preventDefault();
		console.log("Changed file: " +event.target.value);
		console.log("JSON Date: " + JSON.stringify(event.target.value));
		getS3URL(mediaFile);
	},
	handleSubmit: function(event) {
		event.preventDefault();
    	var mediaFile = React.findDOMNode(this.refs.mediaFile).value.trim();
    	if (!mediaFile) {
     		 return;
    	}
    	// TODO: send request to the server
    	submitFormToServer(this.props.url, this.state.mediaLink);

    	React.findDOMNode(this.refs.mediaFile).value = '';
    	return;
	},
	render: function() {
		return(
			React.createElement("div", null, 
			React.createElement("p", null, "Add voice recording (that people can listen to when they reach your profile)"), 
			React.createElement("form", {onSubmit: this.handleSubmit}, 
  				React.createElement("input", {type: "file", name: "audio", onChange: this.handleChange, ref: "mediaFile", accept: "audio/*"}), 
  				React.createElement("input", {type: "submit", value: "Save"})
			)
			)
		);
	}

});


React.render(React.createElement(SubmitMediaForm, {url: "/api/media/"}), document.getElementById("submitMediaForm"));

function getS3URL(file) {
	var url = ("/sign_s3?file_name="+file.name+"&file_type="+file.type);
	console.log("URL get: " + url);
	$.ajax({
      url: url,
      type: "GET",
      data: data,
      dataType: 'json',
      cache: false,
      success: function(response){
      if (this.isMounted()){
        console.log("Success! " + response);
        this.setState({mediaLink:response});
      }
      }.bind(this),
      error: function(xhr,status,err){
        console.error(status, err.toString());
      }.bind(this)
      });
}

function submitFormToServer(url, data) {
	$.ajax({
      url: url,
      type: "POST",
      data: data,
      dataType: 'json',
      cache: false,
      success: function(response){
      if (this.isMounted()){
        console.log("Success! " + response);
      }
      }.bind(this),
      error: function(xhr,status,err){
        console.error(status, err.toString());
      }.bind(this)
      });
}