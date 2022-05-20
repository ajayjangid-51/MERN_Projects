import { createContext, useReducer } from "react";

const INITIAL_STATE = {
	city: undefined,
	dates: [],
	options: {
		adult: undefined,
		children: undefined,
		room: undefined,
	},
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
	switch (action.type) {
		case "NEW_SEARCH":
			return action.payload;
		case "RESET_SEARCH":
			return INITIAL_STATE;
		default:
			return state;
	}
};

export const SearchContextProvider = ({ children }) => {
	// yaha yeh SearchContextProvider is a react-component-fn bcoz its first letter is capital and it is return some component only.
	const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

	return (
		<SearchContext.Provider
			value={{
				city: state.city,
				dates: state.dates,
				options: state.options,
				dispatch,
			}}
		>
			{children}
		</SearchContext.Provider>
	);
};
