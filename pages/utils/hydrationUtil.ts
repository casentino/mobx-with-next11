// import { HydrationStore, RootStoreMembers } from '../stores/RootStore';
import { observable, ObservableMap, ObservableSet, toJS } from 'mobx';
import { HydrateStoreData, HydrationStore, RootStoreMembers } from '../stores/HydrationType';
import { RootStore } from '../stores/RootStore';

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
					parsedValue = Array.from(parsedValue.entries());
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

type HydratatoinStoreKeys<Store extends RootStoreMembers> = keyof HydrationStore<Store>;
type EntriesType<Store extends RootStoreMembers> = [HydratatoinStoreKeys<Store>, Store[HydratatoinStoreKeys<Store>]];

export function deserializationStore<Store extends RootStoreMembers>(
	serailizedStore: HydrationStore<Store>,
	store: Store
): HydrationStore<Store> {
	const entreis = Object.entries<HydrationStore<Store>[HydratatoinStoreKeys<Store>]>(serailizedStore) as Array<
		EntriesType<Store>
	>;
	return entreis.reduce<HydrationStore<Store>>((prev, curr) => {
		const [key, value] = curr;
		if (value instanceof Array) {
			if (store[key] instanceof ObservableSet || store[key] instanceof Set) {
				return {
					...prev,
					[key]: observable.set(value),
				};
			}
			if (store[key] instanceof ObservableMap || store[key] instanceof Map) {
				return {
					...prev,
					[key]: observable.map(value),
				};
			}
		}
		return {
			...prev,
			[key]: value,
		};
	}, {});
}
