import type { AxiosInstance } from 'axios';
import type { TokenDto } from '../util/spotify';
import type { MeDto } from './types';
import { default as _axios } from 'axios';
import useSWR from 'swr';

import { refreshToken } from 'lib/util/spotify';
const axios: AxiosInstance = _axios.create({
	baseURL: 'http://localhost:3000/api/spotify',
	headers: {
		'Content-Type': 'application/json'
	},
	timeout: 3000
});

axios.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		console.log('ERROR HOOK', error);
		if (error.response.status === 401) {
			refreshToken(error.request, error.response);
		}
	}
);

const fetcher = (token: string) => (url: string) => {
	console.log('CALL');
	return axios
		.get(url, {
			withCredentials: true,
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then((res) => res.data)
		.catch((error) => {
			console.log('ERROR', error);
			console.log('TOKEN', token);
		});
};

export const useMe = (token: TokenDto) => {
	const { access_token } = token;
	const { data: me, error } = useSWR<MeDto>('/me', fetcher(access_token));
	return { me, error };
};
