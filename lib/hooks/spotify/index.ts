import type { SWRConfiguration } from 'swr';
import useSWR from 'swr';
import fetcher from '@/util/axios-api';

export const useSpotify = <TReturnDataTdo>(
	url: string | string[] | null,
	options: SWRConfiguration = {}
) => {
	const { data, error } = useSWR<TReturnDataTdo, Error>(url, fetcher, options);
	return { data, error };
};
