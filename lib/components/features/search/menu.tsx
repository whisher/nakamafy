import React from 'react';
import { useSearch, SearchTypeAction, MenuTypesDto } from '../../../hooks/search';

export type OptionLabelsDto = { [Key in MenuTypesDto]: string };
export const options: OptionLabelsDto = {
	artist: 'Artists',
	track: 'Songs',
	playlist: 'Playlists',
	album: 'Albums',
	show_episode: 'Podcast & Shows'
};

const SearchMenu: React.FC = () => {
	const { state, dispatch } = useSearch();
	const handleType = (type: MenuTypesDto | undefined) => {
		dispatch({ type: SearchTypeAction.Type, payload: type });
	};
	const common =
		'h-7 flex items-center px-2 rounded-xl text-sm tracking-wide backdrop-blur-2xl transition ease-in-out';

	return (
		<nav className="px-6 bg-gray-600">
			<ul
				className={`flex items-center gap-3 transition ${
					state.path.query.length > 0 ? 'opacity-100' : 'opacity-0'
				}`}
				role="group"
			>
				<li>
					<button
						type="button"
						className={`${common} ${
							undefined === state.path.type ? 'bg-white text-[#212121]' : 'bg-[#212121] text-white'
						}`}
						onClick={() => handleType(undefined)}
					>
						<span className="first-letter:uppercase">all</span>
					</button>
				</li>
				{Object.entries(options).map(([key, value]) => {
					return (
						<li key={key}>
							<button
								type="button"
								className={`${common} ${
									key === state.path.type ? 'bg-white text-[#2a2a2a]' : 'bg-[#2a2a2a] text-white'
								}`}
								onClick={() => {
									handleType(key as MenuTypesDto);
								}}
							>
								<span className="first-letter:uppercase">{value}</span>
							</button>
						</li>
					);
				})}
				<li>
					<button type="button" className={`${common}bg-[#212121] text-white`}>
						<span className="first-letter:uppercase">Profiles</span>
					</button>
				</li>
			</ul>
		</nav>
	);
};

export { SearchMenu };
