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

export interface MeTopArtistsDto {
	items: MeTopArtistsItemsDto[];
	total: number;
	limit: number;
	offset: number;
	href: string;
	previous: any;
	next: string;
}

export interface MeTopArtistsItemsDto {
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

// =====================

export interface Root {
	collaborative: boolean;
	description: string;
	external_urls: ExternalUrls;
	followers: Followers;
	href: string;
	id: string;
	images: Image[];
	name: string;
	owner: Owner;
	primary_color: any;
	public: boolean;
	snapshot_id: string;
	tracks: Tracks;
	type: string;
	uri: string;
}

export interface ExternalUrls {
	spotify: string;
}

export interface Followers {
	href: any;
	total: number;
}

export interface Image {
	height: number;
	url: string;
	width: number;
}

export interface Owner {
	display_name: string;
	external_urls: ExternalUrls2;
	href: string;
	id: string;
	type: string;
	uri: string;
}

export interface ExternalUrls2 {
	spotify: string;
}

export interface Tracks {
	href: string;
	items: Item[];
	limit: number;
	next: any;
	offset: number;
	previous: any;
	total: number;
}

export interface Item {
	added_at: string;
	added_by: AddedBy;
	is_local: boolean;
	primary_color: any;
	track: Track;
	video_thumbnail: VideoThumbnail;
}

export interface AddedBy {
	external_urls: ExternalUrls3;
	href: string;
	id: string;
	type: string;
	uri: string;
}

export interface ExternalUrls3 {
	spotify: string;
}

export interface Track {
	album: Album;
	artists: Artist2[];
	available_markets: string[];
	disc_number: number;
	duration_ms: number;
	episode: boolean;
	explicit: boolean;
	external_ids: ExternalIds;
	external_urls: ExternalUrls7;
	href: string;
	id: string;
	is_local: boolean;
	name: string;
	popularity: number;
	preview_url?: string;
	track: boolean;
	track_number: number;
	type: string;
	uri: string;
}

export interface Album {
	album_type: string;
	artists: Artist[];
	available_markets: string[];
	external_urls: ExternalUrls5;
	href: string;
	id: string;
	images: Image2[];
	name: string;
	release_date: string;
	release_date_precision: string;
	total_tracks: number;
	type: string;
	uri: string;
}

export interface Artist {
	external_urls: ExternalUrls4;
	href: string;
	id: string;
	name: string;
	type: string;
	uri: string;
}

export interface ExternalUrls4 {
	spotify: string;
}

export interface ExternalUrls5 {
	spotify: string;
}

export interface Image2 {
	height: number;
	url: string;
	width: number;
}

export interface Artist2 {
	external_urls: ExternalUrls6;
	href: string;
	id: string;
	name: string;
	type: string;
	uri: string;
}

export interface ExternalUrls6 {
	spotify: string;
}

export interface ExternalIds {
	isrc: string;
}

export interface ExternalUrls7 {
	spotify: string;
}

export interface VideoThumbnail {
	url: any;
}
