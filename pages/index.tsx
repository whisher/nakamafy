import type { NextPage } from 'next';
import type { GetServerSideProps } from 'next';

import { REDIRECT_ROUTES } from '../lib/constant';
import { hasTokenExpired, getHttpOnlyTokenCookie, refreshToken } from '../lib/util/spotify';
import { Home } from '@/features/home';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const { profile } = REDIRECT_ROUTES;
	const token = getHttpOnlyTokenCookie(req, res);
	const isExpired = hasTokenExpired(token);
	if (isExpired === undefined) {
		return {
			props: {}
		};
	} else if (isExpired) {
		const result = await refreshToken(req, res);
		if (!result) {
			return {
				props: {}
			};
		}
		return {
			props: {}
		};
	} else {
		return {
			redirect: {
				destination: profile,
				permanent: false
			}
		};
	}
};

const HomePage: NextPage = () => {
	return <Home />;
};

export default HomePage;
