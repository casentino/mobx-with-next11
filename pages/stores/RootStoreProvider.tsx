import React from 'react';
import { getIsServer } from '../utils/common';
import { RootStore } from './RootStore';

let rootStore: RootStore;

export const StoreContext = React.createContext<RootStore | undefined>(undefined);

StoreContext.displayName = 'MobXStoreContext';

export function useRootStore() {
	const context = React.useContext(StoreContext);

	if (context === undefined) {
		throw new Error('useRootStore must be used within RootStoreProvider');
	}

	return context;
}

export function initializeRootStore(hydrationData?: RootStore) {
	const store = rootStore ?? new RootStore();

	if (hydrationData) {
		store.hydrate(hydrationData);
	}
	if (getIsServer()) {
		return store;
	}
	if (!rootStore) {
		rootStore = store;
	}
	return store;
}

interface RootStoreProviderProps {
	hydrationData: RootStore;
}

export function RootStoreProvider({ children, hydrationData }: React.PropsWithChildren<RootStoreProviderProps>) {
	const store = initializeRootStore(hydrationData);
	return <StoreContext.Provider value={hydrationData}>{children}</StoreContext.Provider>;
}