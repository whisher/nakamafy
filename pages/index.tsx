import type { NextPage } from 'next';
import type { TokenExpiredDto } from '../lib/util/spotify';

import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { hasTokenExpired, refreshToken } from '../lib/util/spotify';
import { Profile } from '@/features/profile';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const { isExpired, token } = hasTokenExpired(req, res);
	if (isExpired === undefined && token === null) {
		return {
			props: {
				auth: !!isExpired,
				token
			}
		};
	} else if (isExpired) {
		const result = await refreshToken(req, res);
		if (!result) {
			return {
				props: {
					auth: false,
					token: null
				}
			};
		}
		const { isExpired, token } = hasTokenExpired(req, res);
		return {
			props: {
				auth: !isExpired,
				token
			}
		};
	} else {
		return {
			props: {
				auth: !isExpired,
				token
			}
		};
	}
};
export type PageTokenExpiredDto = {
	auth: boolean;
	token: TokenExpiredDto['token'];
};
const Home: NextPage<PageTokenExpiredDto> = (data) => {
	const { auth, token } = data;
	return (
		<div className="">
			{auth && !!token ? (
				<Profile token={token} />
			) : (
				<h1>
					<Link href="/api/login">
						<a>Login</a>
					</Link>
				</h1>
			)}
		</div>
	);
};

export default Home;
