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

const fetcher = (url: string) =>
	axios
		.get(url, {
			withCredentials: true
		})
		.then((res) => res.data);

export const useSpotify = <TReturnDataTdo>(
	url: string | string[] | null,
	options: SWRConfiguration = {}
) => {
	const { data, error } = useSWR<TReturnDataTdo, Error>(url, fetcher, options);
	return { data, error };
};
