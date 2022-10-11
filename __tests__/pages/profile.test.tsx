import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { act, waitFor, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import 'whatwg-fetch';
import { server } from '../../_msw';
import { renderWithProviders } from '../../_msw/test-utils';

import { Playlist } from '@/features/playlist';

describe('Profile', () => {
	beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
	afterAll(() => server.close());
	afterEach(() => server.resetHandlers());

	it('handles good response', async () => {
		renderWithProviders(<Playlist id="1" />);

		//screen.getByText('Loading...');

		const heading = await screen.findByRole('heading', { name: /pippo/i });
		expect(heading).toBeInstanceOf(HTMLElement);
	});
});

process.on('unhandledRejection', (error) => {
	// eslint-disable-next-line no-undef
	fail(error);
});
