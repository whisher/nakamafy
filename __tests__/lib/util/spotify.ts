import { decodeBase64, encodeBase64 } from '@/util/spotify';

describe('Util Spotify', () => {
	it('Should decodeBase64, encodeBase64 do reverse', () => {
		const str = 'abcd';
		const strtoTest = decodeBase64(encodeBase64(str));
		expect(str).toEqual(strtoTest);
	});
});
