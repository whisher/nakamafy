import React, { useState } from 'react';
import type { NextRouter } from 'next/router';
import { useRouter } from 'next/router';

import { FiSearch } from 'react-icons/fi';

const getFormInitialValue = (router: NextRouter): string => {
	const asPath = router.asPath;
	const asPathArr = asPath.split('/');
	return asPath.length > 2 ? asPathArr[2] : '';
};
const SearchForm: React.FC = () => {
	const router = useRouter();
	const formInitialValue = getFormInitialValue(router);
	const [search, setSearch] = useState<string>(formInitialValue.length > 0 ? formInitialValue : '');

	console.log('router', formInitialValue);
	const handleSearch = (ev: React.FormEvent<HTMLInputElement>) => {
		setSearch((ev.target as HTMLInputElement).value);
		router.push(`/search/${search}`);
	};

	const handleSubmit = (ev: React.SyntheticEvent) => {
		ev.preventDefault();
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="w-1/4 flex items-center p-0 m-0 rounded-full border-2 border-white bg-white"
			noValidate
		>
			<button type="button" className="bg-white rounded-full border-2 border-white">
				<FiSearch aria-label="submit search" className="text-gray-600 h-6 w-6" />
			</button>
			<label htmlFor="search" className="sr-only">
				Search
			</label>
			<input
				id="search"
				className="flex-1 outline-0 border-0  pl-3 rounded-r-full text-sm placeholder:text-sm placeholder:text-gray-600 caret-gray-600"
				placeholder="What do you want listen to?"
				type="search"
				value={search}
				onChange={handleSearch}
			/>
		</form>
	);
};

export { SearchForm };
