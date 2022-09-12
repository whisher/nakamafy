import React from 'react';
import type { MeDto } from '../../hooks/types';
import { FaUser } from 'react-icons/fa';

export interface AccountProps {
	data: MeDto;
}

const Account: React.FC<AccountProps> = ({ data }) => {
	const { images, display_name } = data;
	const hasAvatar = images.length > 0;
	return (
		<button type="button" className="inline-flex items-center h-7 pl-1 pr-3 rounded-full bg-black">
			{hasAvatar ? (
				<img
					loading="lazy"
					decoding="async"
					src={images[0].url}
					alt={display_name}
					className="h-6 w-6 rounded-full"
				/>
			) : (
				<FaUser className="h-6 w-6 text-brand-200" />
			)}
			<span className="flex-1 pl-2 text-xs text-white/90">{display_name}</span>
		</button>
	);
};

export { Account };
