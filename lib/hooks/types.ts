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

export interface ExplicitContentDto {
	filter_enabled: boolean;
	filter_locked: boolean;
}

export interface ExternalUrlsDto {
	spotify: string;
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
