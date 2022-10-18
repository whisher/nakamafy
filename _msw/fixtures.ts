import type { PagingObject, PlaylistTrackObject, PlaylistObjectFull } from '@/types/search';

const playListResponse: PlaylistObjectFull = {
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
	//primary_color: null,
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
const items: PlaylistTrackObject[] = [
	{
		added_at: '2022-09-01T19:02:04Z',
		added_by: {
			external_urls: { spotify: 'https://open.spotify.com/user/31an5qqykjxwr64tzysztnmq6yra' },
			href: 'https://api.spotify.com/v1/users/31an5qqykjxwr64tzysztnmq6yra',
			id: '31an5qqykjxwr64tzysztnmq6yra',
			type: 'user',
			uri: 'spotify:user:31an5qqykjxwr64tzysztnmq6yra'
		},
		is_local: false,
		//primary_color: null,
		track: {
			album: {
				album_type: 'album',
				artists: [
					{
						external_urls: { spotify: 'https://open.spotify.com/artist/7s4I6rDvTcdBDKElVbtsAN' },
						href: 'https://api.spotify.com/v1/artists/7s4I6rDvTcdBDKElVbtsAN',
						id: '7s4I6rDvTcdBDKElVbtsAN',
						name: 'Bombino',
						type: 'artist',
						uri: 'spotify:artist:7s4I6rDvTcdBDKElVbtsAN'
					}
				],
				available_markets: ['AD'],
				external_urls: { spotify: 'https://open.spotify.com/album/6Zv8PkjigCztS7AON6ZuZe' },
				href: 'https://api.spotify.com/v1/albums/6Zv8PkjigCztS7AON6ZuZe',
				id: '6Zv8PkjigCztS7AON6ZuZe',
				images: [
					{
						height: 640,
						url: 'https://i.scdn.co/image/ab67616d0000b273dfff3cab45c3dcf2f947b91c',
						width: 640
					},
					{
						height: 300,
						url: 'https://i.scdn.co/image/ab67616d00001e02dfff3cab45c3dcf2f947b91c',
						width: 300
					},
					{
						height: 64,
						url: 'https://i.scdn.co/image/ab67616d00004851dfff3cab45c3dcf2f947b91c',
						width: 64
					}
				],
				name: 'Nomad',
				release_date: '2013-01-28',
				release_date_precision: 'day',
				total_tracks: 11,
				type: 'album',
				uri: 'spotify:album:6Zv8PkjigCztS7AON6ZuZe'
			},
			artists: [
				{
					external_urls: { spotify: 'https://open.spotify.com/artist/7s4I6rDvTcdBDKElVbtsAN' },
					href: 'https://api.spotify.com/v1/artists/7s4I6rDvTcdBDKElVbtsAN',
					id: '7s4I6rDvTcdBDKElVbtsAN',
					name: 'Bombino',
					type: 'artist',
					uri: 'spotify:artist:7s4I6rDvTcdBDKElVbtsAN'
				}
			],
			available_markets: ['AD'],
			disc_number: 1,
			duration_ms: 279346,
			//episode: false,
			explicit: false,
			external_ids: { isrc: 'USNO11300012' },
			external_urls: { spotify: 'https://open.spotify.com/track/2st24VONuY9hqiGAPkhyua' },
			href: 'https://api.spotify.com/v1/tracks/2st24VONuY9hqiGAPkhyua',
			id: '2st24VONuY9hqiGAPkhyua',
			is_local: false,
			name: 'Tamiditine',
			popularity: 46,
			preview_url:
				'https://p.scdn.co/mp3-preview/018cc122f26a904e163b3d295a0ce34de18a863b?cid=0f1234e5ea0e44da84e050c3c439a765',
			//track: true,
			track_number: 11,
			type: 'track',
			uri: 'spotify:track:2st24VONuY9hqiGAPkhyua'
		}
		//video_thumbnail: { url: null }
	}
];

const playListResponseWithItems: PlaylistObjectFull = { ...playListResponse };
playListResponseWithItems.tracks.items = items;

export { playListResponse, playListResponseWithItems };
