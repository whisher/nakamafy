import React from 'react';

import type { SearchDto } from '@/types/search';
import type { MenuTypesDto } from '../../../../hooks/search';

import { Alert } from '@/ui/alert';
import { Loader } from '@/ui/loader';
import { SearchSwitcherAlbum } from './album';
import { SearchSwitcherArtist } from './artist';
import { SearchSwitcherPlaylist } from './playlist';
import { SearchSwitcherShow } from './show-episode';
import { SearchSwitcherTrack } from './track';

export interface SearchSwitcherProps {
	data: SearchDto | undefined;
	error: Error | undefined;
	type: MenuTypesDto | undefined;
}

const SearchSwitcher: React.FC<SearchSwitcherProps> = ({ data, error, type }) => {
	if (error) {
		return (
			<div className="mt-14">
				<Alert />
			</div>
		);
	}
	if (!data) {
		return (
			<div className="pt-14">
				<Loader />
			</div>
		);
	}
	switch (type) {
		case 'album':
			const albums = 'albums' in data ? data.albums.items : undefined;
			return <SearchSwitcherAlbum data={albums} />;
		case 'artist':
			const artists = 'artists' in data ? data.artists.items : undefined;
			return <SearchSwitcherArtist data={artists} />;
		case 'playlist':
			const playlists = 'playlists' in data ? data.playlists.items : undefined;
			return <SearchSwitcherPlaylist data={playlists} />;
		case 'show_episode':
			const shows = 'shows' in data ? data.shows.items : undefined;
			const episodes = 'episodes' in data ? data.episodes.items : undefined;
			return <SearchSwitcherShow shows={shows} episodes={episodes} />;
		case 'track':
			const tracks = 'tracks' in data ? data.tracks.items : undefined;
			return <SearchSwitcherTrack data={tracks} />;
		default:
			const playlists2 = 'playlists' in data ? data.playlists.items : undefined;
			return <SearchSwitcherPlaylist data={playlists2} />;
	}
};

export { SearchSwitcher };
