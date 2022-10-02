import type { AxiosInstance } from 'axios';
import { default as _axios } from 'axios';
const axios: AxiosInstance = _axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/spotify/`,
	headers: {
		'Content-Type': 'application/json'
	},
	timeout: 3000
});

const fetcher = (url: string) =>
	axios
		.get(url, {
			withCredentials: true
		})
		.then((res) => res.data);

export default fetcher;
