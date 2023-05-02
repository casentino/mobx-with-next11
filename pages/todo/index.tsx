import { useRootStore } from '@stores/RootStoreProvider';
import UserStore from '@stores/UserStore';
import { serializationStore } from '@utils/hydrationUtil';
import { observer } from 'mobx-react-lite';
import { GetServerSidePropsContext } from 'next';

function Todo(props: React.PropsWithChildren<{}>) {
	console.log(props);
	const { userStore } = useRootStore();
	console.log(userStore);
	return <div>Todo: {userStore.test}</div>;
}

export function getServerSideProps(ctx: GetServerSidePropsContext) {
	console.log('todo ssr');
	const userStore = new UserStore();
	userStore.setTest('asdfasdf');
	return {
		props: {
			hydrationData: {
				userStore: serializationStore(userStore),
			},
		},
	};
}
export default observer(Todo);
