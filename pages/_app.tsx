import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { defaultSeo } from 'next-seo.config';

const Nakamafy = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<DefaultSeo {...defaultSeo} />
			<Component {...pageProps} />
		</>
	);
};

export default Nakamafy;
