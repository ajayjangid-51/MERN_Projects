import { createContext, useEffect, useReducer } from "react"; // yeh yaha {createContext , useEffect, etc, etc} object-deStructuring hai.

const INITIAL_STATE = {
	user: JSON.parse(localStorage.getItem("user")) || null,
	loading: false,
	error: null,
};

export const AuthContext = createContext(INITIAL_STATE);
/* const AuthReducer = ()=>{
  
} */

const AuthReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN_START":
			return {
				user: null,
				loading: true,
				error: null,
			};
		case "LOGIN_SUCCESS":
			return {
				user: action.payload,
				loading: false,
				error: null,
			};
		case "LOGIN_FAILURE":
			return {
				user: null,
				loading: false,
				error: action.payload,
			};
		case "LOGOUT":
			return {
				user: null,
				loading: false,
				error: null,
			};
		default:
			return state;
	}
};

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE); // useReducer-fn meh apn apna "reducer-fn" and "intial-state" daaltehh hai. and then yeh useReducer-fn in the return apnko 2 cheez return krta hai in a form of array , so toh apn array-deStructuring se ess array ko get krletehh hai.

	useEffect(() => {
		localStorage.setItem("user", JSON.stringify(state.user));
	}, [state.user]);

	return (
		<AuthContext.Provider
			value={{
				user: state.user,
				loading: state.loading,
				error: state.error,
				dispatch,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
