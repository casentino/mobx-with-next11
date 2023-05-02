// import { HydrationStore, RootStoreMembers } from '../stores/RootStore';
import { observable, ObservableMap, ObservableSet, toJS } from 'mobx';
import { HydrationStore, IHydrationStore, Keys } from '../stores/HydrationType';

function isNullable(value: unknown) {
	if (value === undefined || value === null || Number.isNaN(value)) {
		return true;
	}
	return false;
}

export function serializationStore<Store extends IHydrationStore>(store: Store): HydrationStore<Store> {
	function parser(o: Record<string, any>) {
		return Object.entries(o).reduce((prev, curr) => {
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
			if (value instanceof Function || isNullable(value)) {
				return prev;
			}
			return {
				...prev,
				[key.replace('_', '')]: parsedValue,
			};
		}, {});
	}
	return parser(toJS(store));
}

type HydratatoinStoreKeys<Store extends IHydrationStore> = keyof HydrationStore<Store>;
type EntriesType<Store extends IHydrationStore> = [keyof Store, HydrationStore<Store>[HydratatoinStoreKeys<Store>]];
/**
 * hydrate해줄 스토어를 첫번째 타입 매개변수로 정해주고,
 * Hydration된 스토어를 두번째 타입 매개변수로 정해줍니다.
 * 같은 명칭의 스토어 property를 HydrationStore 타입이 아닌
 * 원래 Store의 property 타입으로 바꿔줍니다.
 */
type DesrializeStore<Store extends IHydrationStore, HStore extends HydrationStore> = Partial<{
	[K in Keys<HStore>]: K extends keyof Store ? Store[K] : HStore[K];
}>;
export function deserializationStore<Store extends IHydrationStore>(
	store: Store,
	serailizedStore: HydrationStore<Store>
): DesrializeStore<Store, HydrationStore<Store>> {
	const entreis = Object.entries<HydrationStore<Store>[HydratatoinStoreKeys<Store>]>(serailizedStore) as Array<
		EntriesType<Store>
	>;

	return entreis.reduce<DesrializeStore<Store, HydrationStore<Store>>>((prev, curr) => {
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
			if (store[key] instanceof Array) {
				return {
					...prev,
					[key]: observable.array(value),
				};
			}
		}
		return {
			...prev,
			[key]: value,
		};
	}, {});
}
