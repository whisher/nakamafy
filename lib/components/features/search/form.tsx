import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { useSearch, SearchTypeAction } from '../../../hooks/search';

const SearchForm: React.FC = () => {
	const { state, dispatch } = useSearch();

	const handleSearch = (ev: React.FormEvent<HTMLInputElement>) => {
		const query = (ev.target as HTMLInputElement).value;
		dispatch({ type: SearchTypeAction.Query, payload: query });
	};

	const handleSubmit = (ev: React.SyntheticEvent) => {
		ev.preventDefault();
		dispatch({ type: SearchTypeAction.Query, payload: state.path.query });
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
				value={state.path.query}
				onInput={handleSearch}
			/>
		</form>
	);
};

export { SearchForm };
