import sanityClient from '@sanity/client';

const client = sanityClient({
	projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
	dataset: import.meta.env.PUBLIC_SANITY_DATASET,
	apiVersion: '2021-03-25', // use current UTC date - see "specifying API version"!
	token: import.meta.env.PUBLIC_SANITY_API_TOKEN,
	useCdn: false, // `false` if you want to ensure fresh data
});

export default client;
