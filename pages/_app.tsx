import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { defaultSeo } from 'next-seo.config';
import { Layout } from '../lib/components/layout';

const Nakamafy = ({ Component, pageProps }: AppProps) => {
	return (
		<Layout>
			<DefaultSeo {...defaultSeo} />
			<Component {...pageProps} />
		</Layout>
	);
};

export default Nakamafy;
