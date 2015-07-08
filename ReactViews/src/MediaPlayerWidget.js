var AudioPlayer = React.createClass({
	render: function() {
		return(
			<audio controls>
  				<source src={this.props.mediaLink} type={this.props.extension} />
			</audio>
		);
	}

});

var MediaWidget = React.createClass({
	getInitialState: function() {
		return({mediaObjects:[]});
	},
	componentDidMount: function() {
		console.log("Media url: " + this.props.url);
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
			var mediaObject = mediaArray[0];

			if (mediaObject.mediaType == "AUDIO"){
				var extension;
				if (mediaObject.extensionType == "mp3") {
					extension = "audio/mpeg";
				} else if (mediaObject.extensionType == "wav") {
					extension = "audio/wav";
				}
				displayMedia.push(<AudioPlayer mediaLink={mediaObject.mediaLink} extension={extension} />);
			}			
		}
		
		return(
			<div>
			{displayMedia}
			</div>
		);
	}
});

var href=  window.location.href;
var user_id = href.substr(href.lastIndexOf('/') + 1);
var urlCall = "/api/media/"+user_id;
React.render(<MediaWidget url={urlCall} />, document.getElementById("mediaPlayerWidget"));

