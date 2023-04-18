import { RootStore } from './RootStore';

export type RootStoreMembers<Store extends RootStore, MemberKeys extends keyof Store = keyof Store> = {
	[K in MemberKeys]: Store[K] extends CallableFunction ? unknown : Store[K];
};

export type HydrationStore<Store extends IHydrationStore = IHydrationStore> = Partial<{
	[K in keyof Store]: Store[K] extends CallableFunction ? undefined : Store[K];
}>;
export abstract class IHydrationStore {
	abstract hydrate(data?: HydrationStore): void;
}
type isExtends<T, X, K extends string> = T extends X ? `${K}` : never;
type ExcludeStore<Keys extends string, Store, I extends IHydrationStore> = {
	[K in Keys as `${isExtends<K extends keyof Store ? Store[K] : '', I, K>}`]: K extends keyof Store
		? Store[K] extends I
			? HydrationStore<Store[K]>
			: never
		: never;
};

type RootStoreKeys = keyof RootStoreMembers<RootStore>;

export type HydrateStoreData = Partial<ExcludeStore<RootStoreKeys, RootStoreMembers<RootStore>, IHydrationStore>>;
