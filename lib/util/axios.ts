import type { AxiosInstance } from 'axios';
import { default as _axios } from 'axios';
const axios: AxiosInstance = _axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
	headers: {
		'Content-Type': 'application/json'
	},
	timeout: 4000
});

export default axios;
