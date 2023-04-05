import { RootStore } from './RootStore';
import TodoStore from './TodoStore';

export type RootStoreMembers<MemberKeys extends keyof RootStore = keyof RootStore> =
  RootStore[MemberKeys] extends CallableFunction ? unknown : RootStore[MemberKeys];

export type HydrationStore<MRoot extends RootStoreMembers = RootStoreMembers> = Partial<{
  [K in keyof MRoot]: MRoot[K] extends CallableFunction ? undefined : MRoot[K];
}>;

export interface IHydrationStore<Store extends RootStoreMembers> {
  hydrate(data?: HydrationStore<Store>): void;
}

export type HydrateStoreData = {
  todoStore?: HydrationStore<TodoStore>;
};
