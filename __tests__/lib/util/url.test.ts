import { buildUrl, isEmptyObject } from '@/util/url';
describe('Util Url', () => {
	it('Should isEmptyObject return true if the param is not an valid object', () => {
		const isEmpty = isEmptyObject({});
		expect(isEmpty).toBe(true);
	});
	it('Should isEmptyObject return false if the param is not {}', () => {
		const isEmpty1 = isEmptyObject({ key: undefined });
		const isEmpty2 = isEmptyObject({ key: '' });
		const isEmpty3 = isEmptyObject({ key: [] });
		expect(isEmpty1 && isEmpty2 && isEmpty3).toBe(false);
	});

	it('Should buildUrl throw error with the wrong params', () => {
		try {
			const url = buildUrl(undefined, {});
		} catch (e) {
			expect(e).toBeInstanceOf(Error);
		}
	});

	it('Should buildUrl throw error with the empty array', () => {
		try {
			const url = buildUrl([], {});
		} catch (e) {
			expect(e).toBeInstanceOf(Error);
		}
	});

	it('Should buildUrl return path without query param', () => {
		const url = buildUrl(['parent', 'child'], {});
		expect(url).toEqual('parent/child');
	});
	it('Should buildUrl return path with query param', () => {
		const url = buildUrl(['parent', 'child'], { key: 'value' });
		expect(url).toEqual('parent/child?key=value');
	});
});
