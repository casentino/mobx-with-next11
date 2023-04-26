import { RootStore } from './RootStore';

export type RootStoreMembers<Store extends RootStore, MemberKeys extends keyof Store = keyof Store> = {
	[K in MemberKeys]: Store[K] extends CallableFunction ? unknown : Store[K];
};

/**
 *  interface IHydrationStore 를 implements 하는 스토어에
 *  hydratation 을 위해 serialize가 가능한 타입으로 변경 시키기 위해
 *  store 의 함수형태는 제외하고 observable 한 멤버 변수만 남깁니다.
 */
export type HydrationStore<Store extends IHydrationStore = IHydrationStore> = Partial<{
	[K in keyof Store]: Store[K] extends CallableFunction ? undefined : Store[K];
}>;

/**
 * IHydrationStore 를 Implements 하는
 * Store는 인자로 넘겨받은 serialize된 hydrateData를 deserialize해서
 * Store 상태값에 set 해줍니다.
 */

export interface IHydrationStore {
	hydrate(hydrateData?: HydrationStore): void;
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

/**
 *
 * RootStore 의 스토어들중 IHydrationStore를 implements 하고 있는 스토어들만 남기고
 * RootStore 의 hydrate 함수의 인자로 넘겨줍니다.
 *
 */
export type HydrateStoreData = Partial<ExcludeStore<RootStoreKeys, RootStoreMembers<RootStore>, IHydrationStore>>;
