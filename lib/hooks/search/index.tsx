import React, {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useMemo,
	useReducer
} from 'react';

export enum SearchTypeAction {
	Query = 'query',
	Type = 'type'
}

export type MenuTypesDto = 'album' | 'artist' | 'playlist' | 'show' | 'track' | 'episode';

type SearchStateDto = {
	path: { query: string; type: MenuTypesDto | undefined };
};
type SearchActionDto =
	| { type: SearchTypeAction.Query; payload: string }
	| { type: SearchTypeAction.Type; payload: MenuTypesDto | undefined };

type ContextDto = {
	state: SearchStateDto;
	dispatch: React.Dispatch<SearchActionDto>;
	getPath: () => string;
};

const initialState: SearchStateDto = {
	path: { query: '', type: undefined }
};

const SearchContext = createContext<ContextDto>({
	state: initialState,
	dispatch: () => null,
	getPath: () => ''
});

const searchReducer = (state: SearchStateDto, action: SearchActionDto) => {
	switch (action.type) {
		case 'query': {
			return { path: { query: action.payload, type: state.path.type } };
		}
		case 'type': {
			return { path: { type: action.payload, query: state.path.query } };
		}
		default: {
			return state;
		}
	}
};

export interface SearchProviderProps {
	children: ReactNode;
}
const SearchProvider = ({ children }: SearchProviderProps) => {
	const [state, dispatch] = useReducer(searchReducer, initialState);

	const getPath = useCallback(() => {
		const {
			path: { query, type }
		} = state;
		if (!query && !type) {
			return `?q=''&type=playlist`;
		} else if (query && type) {
			return `?q=${query}&type=${type}`;
		} else {
			return `?q=${query}&type=playlist`;
		}
	}, [state]);

	const context = useMemo(() => {
		return { state, dispatch, getPath };
	}, [state, dispatch, getPath]);

	const value = { ...context };
	return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};

function useSearch() {
	const context = useContext(SearchContext);
	if (context === undefined) {
		throw new Error('useSearch must be used within a SearchProvider');
	}
	return context;
}

export { SearchProvider, useSearch };
