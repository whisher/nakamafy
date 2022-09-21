import React from 'react';
import { RadioGroup } from '@headlessui/react';

export type OptionsDto =
	| 'all'
	| 'songs'
	| 'podcasts'
	| 'artists'
	| 'playlist'
	| 'albums'
	| 'profiles'
	| 'genres';

export const options: OptionsDto[] = [
	'all',
	'songs',
	'podcasts',
	'artists',
	'playlist',
	'albums',
	'profiles',
	'genres'
];

export interface SearchMenuProps {
	selected: OptionsDto;
	setSelected: (value: OptionsDto) => void;
}

const SearchMenu: React.FC<SearchMenuProps> = ({ selected, setSelected }) => {
	const common =
		'h-7 flex items-center px-2 rounded-xl text-sm tracking-wide backdrop-blur-2xl transition ease-in-out duration-300';

	return (
		<ul className="flex items-center gap-3" role="group">
			{options.map((option) => {
				return (
					<li key={option}>
						<button
							type="button"
							className={`${common} ${
								option === selected ? 'bg-white text-[#212121]' : 'bg-[#212121] text-white'
							}`}
							onClick={() => setSelected(option)}
						>
							<span className="first-letter:uppercase">{option}</span>
						</button>
					</li>
				);
			})}
		</ul>
	);
};

export { SearchMenu };
