import type { TokenDto } from '../util/spotify';

import axios from '../util/axios';
import useSWR from 'swr';

const fetcher = (token: string) => (url: string) =>
	axios
		.get(url, {
			withCredentials: true,
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then((res) => res.data)
		.catch((error) => {
			console.error('ERROR', error);
		});

export const useSpotify = <T>(url: string, token: TokenDto) => {
	const { access_token } = token;
	const { data, error } = useSWR<T>(`/api/spotify/${url}`, fetcher(access_token));
	return { data, error };
};
