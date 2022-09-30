import React from 'react';
import type { MeDto } from '@/types/spotify';

import { Account } from '@/ui/account';

import { SearchForm } from './form';

export interface SearchHeaderProps {
	me: MeDto;
}

const SearchHeader = ({ me }: SearchHeaderProps) => {
	return (
		<div className="fixed top-0 left-0 right-0 z-50 h-14 flex justify-between items-center ml-56 px-6 bg-gray-600">
			<SearchForm />
			<Account data={me} />
		</div>
	);
};

export { SearchHeader };
