var AudioPlayer = React.createClass({displayName: "AudioPlayer",
	render: function() {
		return(
			React.createElement("audio", {controls: true}, 
  				React.createElement("source", {src: this.props.mediaLink, type: this.props.extension})
			)
		);
	}

});

var MediaWidget = React.createClass({displayName: "MediaWidget",
	getInitialState: function() {
		return({mediaObjects:[]});
	},
	componentDidMount: function() {
		$.ajax({
  			url: this.props.url,
  			dataType: 'json',
  			method: "GET",
  			cache: false,
  			success: function(arrayOfMediaObjects) {
  				this.setState({mediaObjects:arrayOfMediaObjects});
  			}.bind(this),
  			error: function(xhr,status,err){
       			console.error(status, err.toString());
     	 	}.bind(this)
		});
	},
	render: function() {
		var mediaArray = this.state.mediaObjects;
		var displayMedia = [];
		if (mediaArray.length > 0) {
			var mediaObject = mediaArray;

			if (mediaObject.mediaType == "AUDIO"){
				var extension;
				if (mediaObject.extensionType == "mp3") {
					extension = "audio/mpeg";
				} else if (mediaObject.extensionType == "wav") {
					extension = "audio/wav";
				}
				displayMedia.push(React.createElement(AudioPlayer, {mediaLink: mediaObject.mediaLink, extension: extension}));
			}			
		}
		
		return(
			React.createElement("div", null, 
			displayMedia
			)
		);
	}
});

var href=  window.location.href;
var user_id = href.substr(href.lastIndexOf('/') + 1);
var urlCall = "/api/media/"+user_id;
React.render(React.createElement(MediaWidget, {url: urlCall}), document.getElementById("mediaPlayerWidget"));

