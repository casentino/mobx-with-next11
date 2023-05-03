import '@styles/globals.css';
import type { AppContext, AppProps } from 'next/app';
import { RootStoreProvider } from '@stores/RootStoreProvider';
import { HydrateStoreData } from '@stores/HydrationType';

interface PageProps {
	hydrationData?: HydrateStoreData;
}

interface MyAppProps extends AppProps<PageProps> {
	pageProps: PageProps;
}

function MyApp({ Component, pageProps }: MyAppProps) {
	const { hydrationData, ...props } = pageProps;
	return (
		<RootStoreProvider hydrationData={hydrationData}>
			<Component {...props} />
		</RootStoreProvider>
	);
}
export default MyApp;
