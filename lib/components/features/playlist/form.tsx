import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
export interface PlaylistSearchFormProps {
	searchHandler: (query: string) => void;
}
const PlaylistSearchForm: React.FC<PlaylistSearchFormProps> = ({ searchHandler }) => {
	const [query, setQuery] = useState('');
	const handleSearch = (ev: React.FormEvent<HTMLInputElement>) => {
		const query = (ev.target as HTMLInputElement).value;
		setQuery(query);
		searchHandler(query);
	};
	const resetSearch = () => {
		setQuery('');
		searchHandler(query);
	};
	const handleSubmit = (ev: React.SyntheticEvent) => {
		ev.preventDefault();
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="w-1/3 flex items-center py-1 m-0 px-2 rounded border-0  bg-gradient-to-b from-[#2d2d2d] to-[#2b2b2b]"
			noValidate
		>
			<button type="button" className="bg-transparent rounded-full border-0">
				<FiSearch aria-label="submit search" className="text-white/50 h-5 w-5" />
			</button>
			<label htmlFor="search" className="sr-only">
				Search
			</label>
			<input
				id="search"
				className="flex-1 outline-0 border-0 pl-3 py-1.5 rounded-r text-sm text-white/50 bg-transparent placeholder:text-sm placeholder:text-white/50 caret-white/50"
				placeholder="Search for songs or episodes"
				type="search"
				value={query}
				onInput={handleSearch}
			/>
			<button
				onClick={resetSearch}
				type="button"
				className={`bg-transparent rounded-full border-0 transition-opacity ${
					query.length > 0 ? 'opacity-100' : 'opacity-0'
				}`}
			>
				<IoMdClose aria-label="clear search" className="text-white/50 h-5 w-5" />
			</button>
		</form>
	);
};

export { PlaylistSearchForm };
