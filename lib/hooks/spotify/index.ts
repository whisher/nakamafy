import type { TokenDto } from '../../util/spotify';
import type { AxiosInstance } from 'axios';
import type { SWRConfiguration } from 'swr';

import { default as _axios } from 'axios';

const axios: AxiosInstance = _axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/spotify/`,
	headers: {
		'Content-Type': 'application/json'
	},
	timeout: 3000
});

import useSWR from 'swr';

const fetcher = (token: string) => (url: string) =>
	axios
		.get(url, {
			withCredentials: true,
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then((res) => res.data);

export const useSpotify = <TReturnDataTdo>(
	url: string | string[] | null,
	token: TokenDto,
	options: SWRConfiguration = {}
) => {
	const { access_token } = token;
	const { data, error } = useSWR<TReturnDataTdo, Error>(url, fetcher(access_token), options);
	return { data, error };
};
