import { ObservableMap, ObservableSet } from 'mobx';
import { RootStore } from './RootStore';

/**
 * IHydrationStore 를 Implements 하는
 * Store는 인자로 넘겨받은 serialize된 hydrateData를 deserialize해서
 * Store 상태값에 set 해줍니다.
 */

export interface IHydrationStore {
	hydrate(hydrateData?: HydrationStore): void;
}

/**
 *  interface IHydrationStore 를 implements 하는 스토어에
 *  hydratation 을 위해 serialize가 가능한 타입으로 변경 시키기 위해
 *  store 의 함수형태는 제외하고 observable 한 멤버 변수만 남긴다.
 *  observable 상태값이 Map 이거나 Set 이면 배열 타입으로 추론한다.
 */
export type HydrationStore<Store extends IHydrationStore = IHydrationStore> = Partial<{
	[K in Keys<Store> as `${ExcludeFunctionKey<Store, K>}`]: ToNotOptional<
		ExcludeFunctionType<Store, K>,
		ObservableMap
	> extends ObservableMap<infer Key, infer Value>
		? Array<[Key, Value]>
		: ToNotOptional<ExcludeFunctionType<Store, K>, ObservableSet> extends ObservableSet<infer I>
		? I[]
		: ExcludeFunctionType<Store, K>;
}>;

type StepOne<Type> = undefined extends Type ? true : false;
type StepTwo<Type, CheckType> = StepOne<Type> extends true ? (CheckType extends Type ? true : false) : false;
type StepThree<Type, CheckType> = StepTwo<Type, CheckType> extends true ? Exclude<Type, undefined> : Type;
type ToNotOptional<Type, CheckType> = StepThree<Type, CheckType>;

type ExcludeFunctionType<Store, K> = K extends keyof Store
	? Store[K] extends CallableFunction
		? never
		: Store[K]
	: never;

/**
 * Store와 Store의 key인 제네릭 K로
 * Store[K] 가 함수형이라면 추론에서 제외시키고
 * 아니라면 키값을 string 타입으로 추론 되도록 한다.
 */
type ExcludeFunctionKey<Store, K extends string> = K extends keyof Store
	? Store[K] extends CallableFunction
		? never
		: `${K}`
	: never;

/**
 * 타입 T 가 X의 확장된 타입이라면 T의 프로퍼티 명을 문자열로 리턴해준다.
 */
type IsExtends<T, X, K extends string = Keys<T>> = T extends X ? `${K}` : never;

/**
 * keyof 로 Store의 키를 얻을떄 키의 타입은 string | number | symbol으로 추론된다.
 * 이때 property 명칭은 string 타입만 허용되기 때문에 이를 string으로 추론되도록 한다.
 */
export type Keys<Store> = keyof Store extends string ? keyof Store : never;

/**
 * Store에서 IHydrationStore 를 implements 하는 스토어만
 * 타입으로 추론되도록 한다.
 */
type ExcludeStore<Store, I extends IHydrationStore = IHydrationStore> = Partial<{
	[K in Keys<Store> as `${IsExtends<K extends keyof Store ? Store[K] : '', I, K>}`]: K extends keyof Store
		? Store[K] extends I
			? HydrationStore<Store[K]>
			: never
		: never;
}>;

/**
 * RootStore에서 다른 메소드는 모두 제외하고 스토어들만 남깁니다.
 */
export type RootStoreMembers<Store extends RootStore> = {
	[K in keyof Store]: Store[K] extends CallableFunction ? never : Store[K];
};

/**
 *
 * RootStore 의 스토어들중 IHydrationStore를 implements 하고 있는 스토어들만 남기고
 * RootStore 의 hydrate 함수의 인자로 넘겨줍니다.
 *
 */
export type HydrateStoreData = Partial<ExcludeStore<RootStoreMembers<RootStore>>>;
