import qs from 'qs';

export const isEmptyObject = (value: { [x: string]: string | string[] | undefined }): boolean => {
	return Object.keys(value).length === 0 && value.constructor === Object;
};

export const buildUrl = (
	url: string | string[] | undefined,
	params: {
		[x: string]: string | string[] | undefined;
	}
) => {
	if (!url || !Array.isArray(url)) {
		throw new Error('Invalid spotify app url');
	}
	if (isEmptyObject(params)) {
		if (url.length === 0) {
			throw new Error('Invalid spotify app url');
		}
		return url.join('/');
	}
	return `${url.join('/')}?${qs.stringify(params)}`;
};
