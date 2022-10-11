import { rest } from 'msw';

const handlers = [
	rest.get('http://localhost:3000/api/spotify/me', (req, res, ctx) => {
		const mockApiResponse = {
			display_name: 'pippo'
		};
		return res(ctx.json(mockApiResponse));
	})
];

export { handlers };
