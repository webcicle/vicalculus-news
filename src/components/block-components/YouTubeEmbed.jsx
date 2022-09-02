import React from 'react';
import YouTube from 'react-youtube';

export default function YouTubeEmbed({ id }) {
	const onPlayerReady = (event) => {
		// access to player in all event handlers via event.target
		event.target.pauseVideo();
	};

	const opts = {
		height: '390',
		width: '640',
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
		},
	};

	return <YouTube videoId={id} opts={opts} onReady={onPlayerReady} />;
}
