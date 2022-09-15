import type { NextPage } from 'next';
import type { GetServerSideProps } from 'next';
import type { TokenDto } from '../lib/util/spotify';

import { REDIRECT_ROUTES } from '../lib/constant';
import { hasTokenExpired, getHttpOnlyTokenCookie, refreshToken } from '../lib/util/spotify';
import { Profile } from '@/features/profile';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const { home } = REDIRECT_ROUTES;
	const isExpired = hasTokenExpired(req, res);
	if (isExpired === undefined) {
		return {
			redirect: {
				destination: home,
				permanent: false
			}
		};
	} else if (isExpired) {
		const result = await refreshToken(req, res);
		if (!result) {
			return {
				redirect: {
					destination: home,
					permanent: false
				}
			};
		}
		const isExpired = hasTokenExpired(req, res);
		if (isExpired) {
			return {
				redirect: {
					destination: home,
					permanent: false
				}
			};
		}
		const token = getHttpOnlyTokenCookie(req, res);
		if (!token) {
			return {
				redirect: {
					destination: home,
					permanent: false
				}
			};
		}
		return {
			props: {
				token
			}
		};
	} else {
		const token = getHttpOnlyTokenCookie(req, res);
		if (!token) {
			return {
				redirect: {
					destination: home,
					permanent: false
				}
			};
		}
		return {
			props: {
				token
			}
		};
	}
};
export type SearchPageProps = {
	token: TokenDto;
};
const SearchPage: NextPage<SearchPageProps> = (data) => {
	const { token } = data;
	return <Profile token={token} />;
};

export default SearchPage;
