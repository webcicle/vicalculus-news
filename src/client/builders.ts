import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageObject } from '@sanity/image-url/lib/types/types';
import client from './sanity';

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageObject) {
	return builder.image(source);
}
