import 'whatwg-fetch';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { server } from '../../_msw';
import { renderWithProviders } from '../../_msw/test-utils';

import Playlist from '../../pages/playlist/[id]';

describe('Profile', () => {
	beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
	afterAll(() => server.close());
	afterEach(() => server.resetHandlers());

	it('handles good response', async () => {
		renderWithProviders(<Playlist id="abcd" />);
		const loader = screen.getByTestId('is-loading');
		expect(loader).toBeInstanceOf(HTMLElement);
		const account = await screen.findByTestId('user-account');
		expect(account.textContent).toContain('user test');
		const playlistName = await screen.findByRole('heading', {
			name: /My Playlist #1/i
		});
		expect(playlistName).toBeInstanceOf(HTMLElement);
		const searchInput = await screen.findByPlaceholderText('Search for songs or episodes');
		fireEvent.input(searchInput, { target: { value: 'doors' } });
		expect((searchInput as HTMLInputElement).value).toBe('doors');
		const playlistResultParentItems = await screen.findByTestId('playlist-result-parent-items');
		expect(playlistResultParentItems).toBeInstanceOf(HTMLElement);
		expect(playlistResultParentItems.children).toHaveLength(1);
		const addButton = playlistResultParentItems
			.querySelector('li')
			?.querySelector('button') as HTMLButtonElement;
		fireEvent.click(addButton);
	});
});

process.on('unhandledRejection', (error) => {
	// eslint-disable-next-line no-undef
	fail(error);
});
