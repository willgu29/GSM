//Only accepts audio currently
var SubmitMediaForm = React.createClass({displayName: "SubmitMediaForm",
  getInitialState: function() {
    return ({ mediaFile:"",
              mediaLink:""});
  },
	handleChange: function(event) {
		event.preventDefault();
    var file = event.target.value;
    console.log(JSON.stringify(event.target));
    this.setState({mediaFile:file});
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/sign_s3?file_name="+file.name+"&file_type="+file.type);
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                var response = JSON.parse(xhr.responseText);
                upload_file(file, response.signed_request, response.url);
            }
            else{
                alert("Could not get signed URL.");
            }
        }
    };
    xhr.send();

	},
	render: function() {
		return(
			React.createElement("div", null, 
			React.createElement("p", null, "Add voice recording (that people can listen to when they reach your profile)"), 
      React.createElement("input", {type: "file", value: this.state.mediaFile, name: "audio", onChange: this.handleChange, ref: "mediaFile", accept: "audio/*"}), 
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

function get_signed_request(file){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/sign_s3?file_name="+file.name+"&file_type="+file.type);
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                var response = JSON.parse(xhr.responseText);
                upload_file(file, response.signed_request, response.url);
            }
            else{
                alert("Could not get signed URL.");
            }
        }
    };
    xhr.send();
}

function upload_file(file, signed_request, url){
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", signed_request);
    xhr.setRequestHeader('x-amz-acl', 'public-read');
    xhr.onload = function() {
        if (xhr.status === 200) {
            this.setState({mediaLink:url});
            // document.getElementById("mediaLink").value = url;
        }
    };
    xhr.onerror = function() {
        alert("Could not upload file.");
    };
    xhr.send(file);
}