import React from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

export function YouTubeEmbed({ id }: { id: string }) {
	const onPlayerReady: YouTubeProps['onReady'] = (event) => {
		// access to player in all event handlers via event.target
		event.target.pauseVideo();
	};

	const opts: YouTubeProps['opts'] = {
		height: '390',
		width: '640',
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
		},
	};

	return <YouTube videoId={id} opts={opts} onReady={onPlayerReady} />;
}
