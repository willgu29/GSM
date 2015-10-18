//Only accepts audio currently
"use strict";

var SubmitMediaForm = React.createClass({
    displayName: "SubmitMediaForm",

    signS3Request: function signS3Request(file) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/sign_s3?file_name=" + file.name + "&file_type=" + file.type);
        xhr.onreadystatechange = (function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    this.setState({ mediaLink: response.url });
                    this.uploadFile(file, response.signed_request, response.url);
                } else {
                    alert("Could not get signed URL.");
                }
            }
        }).bind(this);
        xhr.send();
    },
    uploadFile: function uploadFile(file, signed_request, url) {
        console.log("signed request: " + signed_request);
        console.log("file string: " + JSON.stringify(file.name));
        console.log("URL: " + url);
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", signed_request);
        xhr.setRequestHeader('x-amz-acl', 'public-read');
        xhr.onload = function () {
            if (xhr.status === 200) {
                // document.getElementById("mediaLink").value = url;
            }
        };
        xhr.onerror = function () {
            console.log("ERROR: " + xhr.status);
            this, setState({ mediaLink: "" });
            alert("Could not upload file. Please try again in a minute.");
        };
        xhr.send(file);
    },
    getInitialState: function getInitialState() {
        return { mediaLink: "" };
    },
    handleChange: function handleChange(event) {
        //event.preventDefault(); We specifically want the form to send its default action everytime...
        //this ^^ fucked me
        var files = document.getElementById("file_input").files;
        var file = files[0];
        if (file == null) {
            alert("No file selected.");
            return;
        }
        this.signS3Request(file);
    },
    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "p",
                null,
                "Add voice recording (that people can listen to when they reach your profile)"
            ),
            React.createElement("input", { id: "file_input", type: "file", name: "file_input", onChange: this.handleChange, accept: "audio/*" }),
            React.createElement(
                "form",
                { method: "POST", action: this.props.url },
                React.createElement("input", { type: "hidden", id: "mediaLink", name: "mediaLink", value: this.state.mediaLink }),
                React.createElement("br", null),
                React.createElement("input", { type: "submit", value: "Save Recording" })
            )
        );
    }

});

React.render(React.createElement(SubmitMediaForm, { url: "/api/media/me" }), document.getElementById("submitMediaForm"));