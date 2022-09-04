import type { GetServerSideProps, NextPage } from 'next';
import axios from 'axios';
import { getCookie } from 'cookies-next';

import { COOKIE_SPOTIFY_STATE_KEY } from '../lib/constant';
import { Alert } from '@/ui/alert';

export type TokenDto = {
	access_token: string;
	token_type: 'Bearer';
	expires_in: number;
	refresh_token: string;
	scope: string;
} | null;

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

export type DataParamName = 'grant_type' | 'code' | 'redirect_uri';

export const getServerSideProps: GetServerSideProps = async ({ query, req, res }) => {
	const { code, state } = query;

	if (getCookie(COOKIE_SPOTIFY_STATE_KEY, { req, res }) !== state) {
		throw new Error('Invalid state');
	}

	const buffer = Buffer.from(`${String(CLIENT_ID)}:${String(CLIENT_SECRET)}`).toString('base64');
	const params: Record<DataParamName, string> = {
		grant_type: 'authorization_code',
		code: String(code),
		redirect_uri: String(REDIRECT_URI)
	};

	const data = new URLSearchParams(params).toString();
	try {
		const result = await axios({
			method: 'post',
			url: 'https://accounts.spotify.com/api/token',
			data,
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
				Authorization: `Basic ${buffer}`
			}
		});
		if ('data' in result) {
			const token = result.data as String;
			return {
				props: {
					token
				}
			};
		}
		return {
			props: {
				token: null
			}
		};
	} catch (error) {
		console.error('error', error);
		return {
			props: {
				token: null
			}
		};
	}
};
const Callback: NextPage<{ token: TokenDto }> = ({ token }) => {
	if (!token) {
		return <Alert />;
	}
	return (
		<div className="">
			<h1>Call</h1>
		</div>
	);
};

export default Callback;

/**
 * 
 * token {
  access_token: 'BQAzc12wLEcpNGROyeAe33gtlNJjEEvRpFLsaNB4AEILipeD7PZGm1E5fi4qRx-rR1ZbwOzS0YmD0Fr8Oa284fzqDg2S0ZqYeI2ZqcFt-04D5H4aRcY7Y_MU3qgPQsBAf3IssGaVKZRGL-YhJnrjj6xFbSF933nPL0WFGn5xXNZltfG3aMJvHJDMw4aFYmEU-jOe6wpbdED5H8kms4eMYQ',
  token_type: 'Bearer',
  expires_in: 3600,
  refresh_token: 'AQDzV9k_Ii916V8GRwMWHxRHeIRKsoh_-9rB3cxRgz6g7cq09ZgqN38fVSwQx65bcokDQfturJ1L2MhDIo-XSwkkuD79KSEi9VlSUvdeSIg3givX0Tlce5JCIKBHPP9XtpA',
  scope: 'user-read-email user-read-private'
}

 */
