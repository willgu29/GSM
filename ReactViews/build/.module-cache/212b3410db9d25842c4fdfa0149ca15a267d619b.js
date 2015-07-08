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
		if (mediaObject.length > 0) {
			var mediaObject = this.state.mediaObjects[0];
			var arrayOfMedia = [];

			if (mediaObject.mediaType == "AUDIO"){
				var extension;
				if (mediaObject.extensionType == "mp3") {
					extension = "audio/mpeg";
				} else if (mediaObject.extensionType == "wav") {
					extension = "audio/wav";
				}
				arrayOfMedia.push(React.createElement(AudioPlayer, {mediaLink: mediaObject.mediaLink, extension: extension}));
			}			
		}
		
		return(
			React.createElement("div", null, 
			arrayOfMedia
			)
		);
	}
});

var url = document.window.pathname;
var parts = url.split('/');
var urlCall = "/api/media/"+user_id;
React.render(React.createElement(MediaWidget, {url: urlCall}), document.getElementById("mediaWidget"));

