import { APP_TITLE } from './lib/constant';
const description = 'Nakamafy a simple clone of Spotify';
const title = APP_TITLE;
const url = process.env.NEXT_PUBLIC_BASE_URL;

const seo = {
	title,
	titleTemplate: '%s',
	description,
	openGraph: {
		description,
		title,
		type: 'website',
		url
	},
	twitter: {
		handle: '@ilwebdifabio',
		site: '@ilwebdifabio'
	}
};

export { seo as defaultSeo, url as defaultUrl };
