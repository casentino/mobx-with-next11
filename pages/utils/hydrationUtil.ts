// import { HydrationStore, RootStoreMembers } from '../stores/RootStore';
import { ObservableMap, ObservableSet, toJS } from 'mobx';
import { HydrationStore, RootStoreMembers } from '../stores/HydrationType';

export function serializationStore<Store extends RootStoreMembers>(store: Store): HydrationStore<Store> {
	function parser(o: Record<string, unknown>) {
		if (o instanceof Function) {
			return o;
		}
		return Object.entries(store).reduce((prev, curr) => {
			const [key, value] = curr;
			let parsedValue = value;

			if (typeof parsedValue === 'object') {
				if (parsedValue instanceof Map || parsedValue instanceof ObservableMap) {
					parsedValue = Object.fromEntries(Array.from(parsedValue.entries()));
				}
				if (parsedValue instanceof Set || parsedValue instanceof ObservableSet) {
					parsedValue = Array.from(parsedValue.values());
				}
			}

			return {
				...prev,
				[key]: parsedValue,
			};
		}, {});
	}

	const strStore = JSON.stringify(parser(toJS(store) as any));

	const serializeStore = Object.entries(JSON.parse(strStore)).reduce((prev, curr) => {
		const [key, value] = curr;
		return {
			...prev,
			[key.replace('_', '')]: value,
		};
	}, {});
	return serializeStore;
}
