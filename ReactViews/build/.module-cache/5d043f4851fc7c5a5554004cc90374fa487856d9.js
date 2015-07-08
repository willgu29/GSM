//Only accepts audio currently
var SubmitMediaForm = React.createClass({displayName: "SubmitMediaForm",
  signS3Request: function(file) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/sign_s3?file_name="+file.name+"&file_type="+file.type);
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                var response = JSON.parse(xhr.responseText);
                this.setState({mediaLink:response.url});
                console.log("File before function: " + JSON.stringify(file.name));
                this.uploadFile(file,response.signed_request,response.url);
            }
            else{
                alert("Could not get signed URL.");
            }
        }
    }.bind(this);
    xhr.send();
  },
  uploadFile: function(file, signed_request, url) {
    console.log("signed request: " + signed_request);
    console.log("file string: " + JSON.stringify(file.name));
    console.log("URL: " + url);
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", signed_request);
    xhr.setRequestHeader('x-amz-acl', 'public-read');
    xhr.onload = function() {
        if (xhr.status === 200) {
            // this.setState({mediaLink:url});
            // document.getElementById("mediaLink").value = url;
        }
    };//.bind(this);
    xhr.onerror = function() {
        console.log("ERROR: " + xhr.status);
        alert("Could not upload file.");
    };
    xhr.send(file);
  },
  getInitialState: function() {
    return ({ mediaFile:"",
              mediaLink:""});
  },
	handleChange: function(event) {
		event.preventDefault();
    var files = document.getElementById("file_input").files;
    var file = files[0];
    this.setState({mediaFile:file});
    if(file == null){
      alert("No file selected.");
      return;
    } 
    this.signS3Request(file);
    // var xhr = new XMLHttpRequest();
    // xhr.open("GET", "/sign_s3?file_name="+file.name+"&file_type="+file.type);
    // xhr.onreadystatechange = function(){
    //     if(xhr.readyState === 4){
    //         if(xhr.status === 200){
    //             var response = JSON.parse(xhr.responseText);
    //             this.setState({mediaLink:response.url});
    //             upload_file(file, response.signed_request, response.url);
    //         }
    //         else{
    //             alert("Could not get signed URL.");
    //         }
    //     }
    // }.bind(this);
    // xhr.send();

	},
	render: function() {
		return(
			React.createElement("div", null, 
			React.createElement("p", null, "Add voice recording (that people can listen to when they reach your profile)"), 
      React.createElement("input", {id: "file_input", type: "file", name: "file_input", onChange: this.handleChange, accept: "audio/*"}), 
			React.createElement("form", {method: "POST", action: this.props.url}, 
        React.createElement("input", {type: "hidden", id: "mediaLink", name: "mediaLink", value: this.state.mediaLink}), 
        React.createElement("br", null), 
  			React.createElement("input", {type: "submit", value: "Save"})
			)
			)
		);
	}

});


React.render(React.createElement(SubmitMediaForm, {url: "/api/media/me"}), document.getElementById("submitMediaForm"));

