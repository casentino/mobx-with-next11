import { useRootStore } from '@stores/RootStoreProvider';
import UserStore from '@stores/UserStore';
import Link from 'next/Link';
import { serializationStore } from '@utils/hydrationUtil';
import { observer } from 'mobx-react-lite';
import { GetServerSidePropsContext } from 'next';

function Todo(props: React.PropsWithChildren<{}>) {
	const { userStore } = useRootStore();
	console.log(props);
	return (
		<div>
			Todo: {userStore.test}
			<Link href="/">Home</Link>
		</div>
	);
}

export function getServerSideProps(ctx: GetServerSidePropsContext) {
	console.log('todo ssr');
	const userStore = new UserStore();
	userStore.setTest('SSR TEST');
	return {
		props: {
			hydrationData: {
				userStore: serializationStore(userStore),
			},
		},
	};
}
export default observer(Todo);
