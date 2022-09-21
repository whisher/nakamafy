import React, { useState } from 'react';
import type { MeDto } from '@/types/spotify';
import type { OptionsDto } from './menu';

import { Account } from '@/ui/account';
import { SearchForm } from './form';
import { options, SearchMenu } from './menu';

export interface SearchHeaderProps {
	me: MeDto;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ me }) => {
	const [selected, setSelected] = useState<OptionsDto>(options[0]);
	console.log(selected);
	return (
		<>
			<div className="fixed top-0 left-0 right-0 z-50 h-14 flex justify-between items-center ml-56 px-6 bg-gray-600">
				<SearchForm />
				<Account data={me} />
			</div>
			<div className="mt-14 px-6">
				<SearchMenu selected={selected} setSelected={setSelected} />
			</div>
		</>
	);
};

export { SearchHeader };
