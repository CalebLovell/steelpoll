import * as React from 'react';
import { useUser } from '@hooks/user';
import firebase from '@utils/firebaseClient';

type Action = { type: `SET_MOBILE_NAV_OPEN`; payload: boolean } | { type: `SET_UID`; payload: string | undefined };
type Dispatch = (action: Action) => void;
type State = { mobileNavOpen: boolean; uid: string | undefined };

const GlobalStateContext = React.createContext<State | undefined>(undefined);
const GlobalDispatchContext = React.createContext<Dispatch | undefined>(undefined);

const initialGlobalState = {
	mobileNavOpen: false,
	uid: undefined,
};

const GlobalReducer = (state: State, action: Action) => {
	switch (action.type) {
		case `SET_MOBILE_NAV_OPEN`: {
			return { ...state, mobileNavOpen: action.payload };
		}
		case `SET_UID`: {
			return { ...state, uid: action.payload };
		}
		default: {
			throw new Error(`Unhandled action type: ${action}`);
		}
	}
};

const GlobalProvider: React.FC = ({ children }) => {
	const [state, dispatch] = React.useReducer(GlobalReducer, initialGlobalState);
	const { refetch: refetchUser } = useUser(state.uid);

	React.useEffect(() => {
		refetchUser();
	}, [state?.uid, refetchUser]);

	React.useEffect(() => {
		const unsubscribe = firebase.auth().onAuthStateChanged(user => dispatch({ type: `SET_UID`, payload: user?.uid }));
		return () => unsubscribe();
	}, []);

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
