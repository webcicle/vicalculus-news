export const twitterFetch = async (url: string) => {
	const data = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${import.meta.env.PUBLIC_TWITTER_BEARER_TOKEN}`,
		},
	});
	return await data.json();
};

export const getTimeFormat = (date: string) => {
	const timeArray = new Date(date).toLocaleTimeString().split(':');
	const amPm = timeArray[2].split(' ')[1];
	return `${timeArray[0]}:${timeArray[1]} ${amPm}`;
};

export const formatTweetText = (tweet: string) => {
	const split = tweet.split(' ');
	if (split[split.length - 1].startsWith('http')) {
		split.pop();
	}
	return split.join(' ');
};
