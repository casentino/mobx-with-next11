import '../styles/globals.css';
import type { AppContext, AppProps } from 'next/app';
import { RootStoreProvider } from './stores/RootStoreProvider';
import { RootStore } from './stores/RootStore';
import { NextPage } from 'next';

interface MyAppProps extends AppProps {
	hydrationData: RootStore;
}

function MyApp({ Component, pageProps, hydrationData }: MyAppProps) {
	return (
		<RootStoreProvider hydrationData={hydrationData}>
			<Component {...pageProps} />
		</RootStoreProvider>
	);
}

export default MyApp;
