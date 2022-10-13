import { rest } from 'msw';

const handlers = [
	rest.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/spotify/me`, (req, res, ctx) => {
		const mockApiResponse = {
			country: 'IT',
			display_name: 'user test',
			email: 'user@test.test',
			explicit_content: { filter_enabled: false, filter_locked: false },
			external_urls: { spotify: '' },
			followers: { href: null, total: 0 },
			href: '',
			id: '',
			images: [],
			product: 'open',
			type: 'user',
			uri: 'spotify:user:'
		};

		return res(ctx.json(mockApiResponse));
	}),
	rest.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/spotify/playlists/abcd`, (req, res, ctx) => {
		const mockApiResponse = {
			collaborative: false,
			description: '',
			external_urls: { spotify: '' },
			followers: { href: null, total: 0 },
			href: '',
			id: 'abcd',
			images: [],
			name: 'My Playlist #1',
			owner: {
				display_name: 'user text',
				external_urls: { spotify: '' },
				href: '',
				id: '',
				type: 'user',
				uri: 'spotify:user:efde'
			},
			primary_color: null,
			public: false,
			snapshot_id: '',
			tracks: {
				href: '',
				items: [],
				limit: 100,
				next: null,
				offset: 0,
				previous: null,
				total: 0
			},
			type: 'playlist',
			uri: 'spotify:playlist:abcd'
		};
		return res(ctx.json(mockApiResponse));
	}),
	rest.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/spotify/search`, (req, res, ctx) => {
		const mockApiResponse = {
			tracks: {
				href: '',
				items: [
					{
						album: {
							album_type: 'album',
							artists: [
								{
									external_urls: {
										spotify: ''
									},
									href: '',
									id: '',
									name: '',
									type: 'artist',
									uri: ''
								}
							],
							available_markets: ['AD'],
							external_urls: { spotify: '' },
							href: '',
							id: '',
							images: [
								{
									height: 640,
									url: 'https://www.fillmurray.com/640/360',
									width: 640
								},
								{
									height: 300,
									url: 'https://www.fillmurray.com/640/360',
									width: 300
								},
								{
									height: 64,
									url: 'https://www.fillmurray.com/640/360',
									width: 64
								}
							],
							name: '',
							release_date: '1991-06-30',
							release_date_precision: 'day',
							total_tracks: 10,
							type: 'album',
							uri: ''
						},
						artists: [
							{
								external_urls: {
									spotify: ''
								},
								href: '',
								id: '',
								name: '',
								type: 'artist',
								uri: ''
							}
						],
						available_markets: ['AD'],
						disc_number: 1,
						duration_ms: 480000,
						explicit: false,
						external_ids: { isrc: '' },
						external_urls: { spotify: '' },
						href: '',
						id: '',
						is_local: false,
						name: '',
						popularity: 14,
						preview_url: '',
						track_number: 16,
						type: 'track',
						uri: ''
					}
				],
				limit: 20,
				next: '',
				offset: 0,
				previous: '',
				total: 4
			}
		};
		return res(ctx.json(mockApiResponse));
	}),
	rest.post(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/spotify/playlists/abcd/tracks`,
		(req, res, ctx) => {
			const mockApiResponse = { snapshot_id: '' };
			return res(ctx.json(mockApiResponse));
		}
	)
];

export { handlers };
