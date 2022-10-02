import React from 'react';
import type { MeDto } from '@/types/spotify';

import { Account } from '@/ui/account';

export interface PlaylistHeaderProps {
	me: MeDto;
}

const PlaylistHeader = ({ me }: PlaylistHeaderProps) => {
	return (
		<div className="fixed top-0 left-0 right-0 z-50 h-14 flex justify-end items-center ml-56 px-6 bg-gray-600">
			<Account data={me} />
		</div>
	);
};

export { PlaylistHeader };
