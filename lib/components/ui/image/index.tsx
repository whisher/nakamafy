import React from 'react';
import Img from 'next/image';

import { ImageObject } from '@/types/search';
import { FALLBACK_IMAGE_SIZE, IMAGE_QUALITY } from '../../../constant';

export interface ImageProps {
	alt: string;
	image: ImageObject;
	className?: string;
}
const Image: React.FC<ImageProps> = ({ image, alt, className = '' }) => {
	const { url } = image;
	const { height, width } = FALLBACK_IMAGE_SIZE;
	return (
		<Img
			src={url}
			alt={alt}
			height={height}
			width={width}
			quality={IMAGE_QUALITY}
			className={className}
		/>
	);
};

export { Image };
