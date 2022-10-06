// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/spotify-api/index.d.ts

export type SearchDto =
	| AlbumSearchResponse
	| ArtistSearchResponse
	| EpisodeSearchResponse
	| PlaylistSearchResponse
	| ShowSearchResponse
	| TrackSearchResponse;

export interface AlbumSearchResponse {
	albums: PagingObject<AlbumObjectSimplified>;
}

export interface ArtistSearchResponse {
	artists: PagingObject<ArtistObjectFull>;
}

export interface EpisodeSearchResponse {
	episodes: PagingObject<EpisodeObjectSimplified>;
}

export interface PlaylistSearchResponse {
	playlists: PagingObject<PlaylistObjectSimplified>;
}

export interface ShowSearchResponse {
	shows: PagingObject<ShowObjectSimplified>;
}

export interface TrackSearchResponse {
	tracks: PagingObject<TrackObjectFull>;
}

export interface AlbumObjectSimplified extends ContextObject {
	album_group?: 'album' | 'single' | 'compilation' | 'appears_on' | undefined;
	album_type: 'album' | 'single' | 'compilation';
	artists: ArtistObjectSimplified[];
	available_markets?: string[] | undefined;
	id: string;
	images: ImageObject[];
	name: string;
	release_date: string;
	release_date_precision: 'year' | 'month' | 'day';
	restrictions?: RestrictionsObject | undefined;
	type: 'album';
	total_tracks: number;
}

export interface ArtistObjectFull extends ArtistObjectSimplified {
	followers: FollowersObject;
	genres: string[];
	images: ImageObject[];
	popularity: number;
}

export interface ArtistObjectSimplified extends ContextObject {
	name: string;
	id: string;
	type: 'artist';
}

export interface ContextObject {
	type: 'artist' | 'playlist' | 'album' | 'show' | 'episode';
	href: string;
	external_urls: ExternalUrlObject;
	uri: string;
}

export interface CopyrightObject {
	text: string;
	type: 'C' | 'P';
}

export interface ExternalIdObject {
	isrc?: string | undefined;
	ean?: string | undefined;
	upc?: string | undefined;
}

export interface ExternalUrlObject {
	spotify: string;
}

export interface FollowersObject {
	href: null;
	total: number;
}

export interface ImageObject {
	height?: number | undefined | null;
	url: string;
	width?: number | undefined | null;
}

export interface PagingObject<T> {
	href: string;
	items: T[];
	limit: number;
	next: string | null;
	offset: number;
	previous: string | null;
	total: number;
}

export interface PlaylistTrackObject {
	added_at: string;
	added_by: UserObjectPublic;
	is_local: boolean;
	track: TrackObjectFull;
}

export interface RestrictionsObject {
	reason: string;
}

export interface ResumePointObject {
	fully_played: boolean;
	resume_position_ms: number;
}

export interface TrackLinkObject {
	external_urls: ExternalUrlObject;
	href: string;
	id: string;
	type: 'track';
	uri: string;
}

export interface UserObjectPublic {
	display_name?: string | undefined;
	external_urls: ExternalUrlObject;
	followers?: FollowersObject | undefined;
	href: string;
	id: string;
	images?: ImageObject[] | undefined;
	type: 'user';
	uri: string;
}

export interface ShowObjectSimplified extends ContextObject {
	available_markets: string[];
	copyrights: CopyrightObject[];
	description: string;
	html_description: string;
	explicit: boolean;
	id: string;
	images: ImageObject[];
	is_externally_hosted: boolean | null;
	languages: string[];
	media_type: string;
	name: string;
	publisher: string;
	type: 'show';
	total_episodes?: number | undefined;
}

export interface EpisodeObjectSimplified extends ContextObject {
	audio_preview_url: string | null;
	description: string;
	duration_ms: number;
	explicit: boolean;
	html_description: string;
	id: string;
	images: ImageObject[];
	is_externally_hosted: boolean;
	is_playable: boolean;
	language: string;
	languages?: string[] | undefined;
	name: string;
	release_date: string;
	release_date_precision: string;
	resume_point?: ResumePointObject | undefined;
	type: 'episode';
}

export interface TrackObjectSimplified {
	artists: ArtistObjectSimplified[];
	available_markets?: string[] | undefined;
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_urls: ExternalUrlObject;
	href: string;
	id: string;
	is_playable?: boolean | undefined;
	linked_from?: TrackLinkObject | undefined;
	restrictions?: RestrictionsObject | undefined;
	name: string;
	preview_url: string | null;
	track_number: number;
	type: 'track';
	uri: string;
}

export interface TrackObjectFull extends TrackObjectSimplified {
	album: AlbumObjectSimplified;
	external_ids: ExternalIdObject;
	popularity: number;
	is_local?: boolean | undefined;
}

export interface PlaylistBaseObject extends ContextObject {
	collaborative: boolean;
	description: string | null;
	id: string;
	images: ImageObject[];
	name: string;
	owner: UserObjectPublic;
	public: boolean | null;
	snapshot_id: string;
	type: 'playlist';
}

export interface PlaylistObjectFull extends PlaylistBaseObject {
	followers: FollowersObject;
	tracks: PagingObject<PlaylistTrackObject>;
}

export interface PlaylistObjectSimplified extends PlaylistBaseObject {
	tracks: {
		href: string;
		total: number;
	};
}
