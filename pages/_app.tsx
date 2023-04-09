import '../styles/globals.css';
import type { AppContext, AppProps } from 'next/app';
import { RootStoreProvider } from './stores/RootStoreProvider';
import { RootStore } from './stores/RootStore';
import { NextComponentType, NextPage } from 'next';
import { HydrateStoreData } from './stores/HydrationType';

interface PageProps {
	hydrationData?: HydrateStoreData;
}

interface MyAppProps extends AppProps<PageProps> {
	pageProps: PageProps;
}
function MyApp({ Component, pageProps: { hydrationData, ...otherPageProps } }: MyAppProps) {
	return (
		<RootStoreProvider hydrationData={hydrationData}>
			<Component {...otherPageProps} />
		</RootStoreProvider>
	);
}

export default MyApp;
