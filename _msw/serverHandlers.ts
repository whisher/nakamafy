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
										spotify: 'https://open.spotify.com/artist/22WZ7M8sxp5THdruNY3gXt'
									},
									href: 'https://api.spotify.com/v1/artists/22WZ7M8sxp5THdruNY3gXt',
									id: '22WZ7M8sxp5THdruNY3gXt',
									name: 'The Doors',
									type: 'artist',
									uri: 'spotify:artist:22WZ7M8sxp5THdruNY3gXt'
								}
							],
							available_markets: ['AD'],
							external_urls: { spotify: 'https://open.spotify.com/album/7IKUTIc9UWuVngyGPtqNHS' },
							href: 'https://api.spotify.com/v1/albums/7IKUTIc9UWuVngyGPtqNHS',
							id: '7IKUTIc9UWuVngyGPtqNHS',
							images: [
								{
									height: 640,
									url: 'https://i.scdn.co/image/ab67616d0000b27320783882533e669760741df2',
									width: 640
								},
								{
									height: 300,
									url: 'https://i.scdn.co/image/ab67616d00001e0220783882533e669760741df2',
									width: 300
								},
								{
									height: 64,
									url: 'https://i.scdn.co/image/ab67616d0000485120783882533e669760741df2',
									width: 64
								}
							],
							name: 'L.A. Woman',
							release_date: '1971-04-19',
							release_date_precision: 'day',
							total_tracks: 10,
							type: 'album',
							uri: 'spotify:album:7IKUTIc9UWuVngyGPtqNHS'
						},
						artists: [
							{
								external_urls: {
									spotify: 'https://open.spotify.com/artist/22WZ7M8sxp5THdruNY3gXt'
								},
								href: 'https://api.spotify.com/v1/artists/22WZ7M8sxp5THdruNY3gXt',
								id: '22WZ7M8sxp5THdruNY3gXt',
								name: 'The Doors',
								type: 'artist',
								uri: 'spotify:artist:22WZ7M8sxp5THdruNY3gXt'
							}
						],
						available_markets: ['AD'],
						disc_number: 1,
						duration_ms: 434720,
						explicit: false,
						external_ids: { isrc: 'USEE19900773' },
						external_urls: { spotify: 'https://open.spotify.com/track/14XWXWv5FoCbFzLksawpEe' },
						href: 'https://api.spotify.com/v1/tracks/14XWXWv5FoCbFzLksawpEe',
						id: '14XWXWv5FoCbFzLksawpEe',
						is_local: false,
						name: 'Riders on the Storm',
						popularity: 74,
						preview_url: '',
						track_number: 10,
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
