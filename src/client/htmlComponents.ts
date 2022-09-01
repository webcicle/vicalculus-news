import ArticleImage from '../components/block-components/ArticleImage.astro';

import HeadingOne from '../components/block-components/ArticleHeadingOne.astro';
import HeadingTwo from '../components/block-components/ArticleHeadingTwo.astro';
import HeadingThree from '../components/block-components/ArticleHeadingThree.astro';
import HeadingFour from '../components/block-components/ArticleHeadingFour.astro';
import Paragraph from '../components/block-components/ArticleParagraph.astro';
import BlockQuote from '../components/block-components/ArticleBlockQuote.astro';
import YouTubeEmbed from '../components/block-components/ArticleYouTubeEmbed.astro';
import type { PortableTextComponents } from 'astro-portabletext';

const myPortableTextComponents = {
	type: {
		image: ArticleImage,
		youtube: YouTubeEmbed,
	},
	block: {
		h1: HeadingOne,
		h2: HeadingTwo,
		h3: HeadingThree,
		h4: HeadingFour,
		blockquote: BlockQuote,
		normal: Paragraph,
	},
};

export default myPortableTextComponents as Partial<PortableTextComponents>;
