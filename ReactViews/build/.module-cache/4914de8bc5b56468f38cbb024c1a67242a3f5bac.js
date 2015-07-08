//Only accepts audio currently
var SubmitMediaForm = React.createClass({displayName: "SubmitMediaForm",
  myFunction: function(file) {
    console.log("MY FUNCTioN");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/sign_s3?file_name="+file.name+"&file_type="+file.type);
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                var response = JSON.parse(xhr.responseText);
                this.setState({mediaLink:file});
                upload_file(file, response.signed_request, response.url);
            }
            else{
                alert("Could not get signed URL.");
            }
        }
    };
    xhr.send();
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
    this.myFunction(file);
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

function get_signed_request(file){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/sign_s3?file_name="+file.name+"&file_type="+file.type);
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                var response = JSON.parse(xhr.responseText);
                this.setState({mediaLink:file});
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
    console.log("signed request: " + signed_request);
    console.log("file: " + file);
    console.log("file string: " + JSON.stringify(file));
    console.log("URL: " + url);
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", signed_request);
    xhr.setRequestHeader('x-amz-acl', 'public-read');
    xhr.onload = function() {
        if (xhr.status === 200) {
            // document.getElementById("mediaLink").value = url;
        }
    };
    xhr.onerror = function() {
        alert("Could not upload file.");
    };
    xhr.send(file);
}

React.render(React.createElement(SubmitMediaForm, {url: "/api/media/me"}), document.getElementById("submitMediaForm"));

