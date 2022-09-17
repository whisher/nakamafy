export interface MeDto {
	country: string;
	display_name: string;
	email: string;
	explicit_content: ExplicitContentDto;
	external_urls: ExternalUrlsDto;
	followers: FollowersDto;
	href: string;
	id: string;
	images: ImageDto[];
	product: string;
	type: string;
	uri: string;
}

export interface MeFollowingDto {
	artists: ArtistsDto;
}
export interface MePlaylistDto {
	href: string;
	items: ItemDto[];
	limit: number;
	next: string;
	offset: number;
	previous: string;
	total: number;
}

export interface ArtistsDto {
	href: string;
	items: ItemDto[];
	limit: number;
	next: string;
	cursors: Cursors;
	total: number;
}
export interface MeTopTracksDto {
	items: MeTopTracksItemsDto[];
	total: number;
	limit: number;
	offset: number;
	href: string;
	previous: any;
	next: string;
}

export interface MeTopTracksItemsDto {
	album: AlbumDto;
	artists: ArtistDto[];
	available_markets: string[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_ids: ExternalIdsDto;
	external_urls: ExternalUrlsDto;
	href: string;
	id: string;
	is_local: boolean;
	name: string;
	popularity: number;
	preview_url?: string;
	track_number: number;
	type: string;
	uri: string;
}

export interface AlbumDto {
	album_type: string;
	artists: ArtistDto[];
	available_markets: string[];
	external_urls: ExternalUrlsDto;
	href: string;
	id: string;
	images: ImageDto[];
	name: string;
	release_date: string;
	release_date_precision: string;
	total_tracks: number;
	type: string;
	uri: string;
}

export interface ArtistDto {
	external_urls: ExternalUrlsDto;
	href: string;
	id: string;
	name: string;
	type: string;
	uri: string;
}

export interface ItemDto {
	external_urls: ExternalUrlsDto;
	followers: FollowersDto;
	genres: string[];
	href: string;
	id: string;
	images: ImageDto[];
	name: string;
	popularity: number;
	type: string;
	uri: string;
}

export interface Cursors {
	after: string;
}
export interface ExplicitContentDto {
	filter_enabled: boolean;
	filter_locked: boolean;
}

export interface ExternalUrlsDto {
	spotify: string;
}

export interface ExternalIdsDto {
	isrc: string;
}
export interface FollowersDto {
	href: string;
	total: number;
}

export interface ImageDto {
	url: string;
	height: number;
	width: number;
}
