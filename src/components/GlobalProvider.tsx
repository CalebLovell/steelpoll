import * as React from 'react';

type Action = { type: `SET_MOBILE_NAV_OPEN`; payload: boolean };
type Dispatch = (action: Action) => void;
type State = { mobileNavOpen: boolean };

const GlobalStateContext = React.createContext<State | undefined>(undefined);
const GlobalDispatchContext = React.createContext<Dispatch | undefined>(undefined);

const initialGlobalState = {
	mobileNavOpen: false,
};

const GlobalReducer = (state: State, action: Action) => {
	switch (action.type) {
		case `SET_MOBILE_NAV_OPEN`: {
			return { ...state, mobileNavOpen: action.payload };
		}
		default: {
			throw new Error(`Unhandled action type: ${action.type}`);
		}
	}
};

const GlobalProvider: React.FC = ({ children }) => {
	const [state, dispatch] = React.useReducer(GlobalReducer, initialGlobalState);

	return (
		<GlobalStateContext.Provider value={state}>
			<GlobalDispatchContext.Provider value={dispatch}>{children}</GlobalDispatchContext.Provider>
		</GlobalStateContext.Provider>
	);
};

const useGlobalState = (): State => {
	const context = React.useContext(GlobalStateContext);
	if (context === undefined) {
		throw new Error(`useGlobalState must be used within a GlobalProvider`);
	}
	return context;
};

const useGlobalDispatch = (): Dispatch => {
	const context = React.useContext(GlobalDispatchContext);
	if (context === undefined) {
		throw new Error(`useGlobalDispatch must be used within a GlobalProvider`);
	}
	return context;
};

export { GlobalProvider, useGlobalState, useGlobalDispatch };
