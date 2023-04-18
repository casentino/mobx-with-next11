import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { RootStoreProvider } from 'stores/RootStoreProvider';
import { HydrateStoreData } from 'stores/HydrationType';

interface MyAppProps extends AppProps {
	hydrationData: HydrateStoreData;
}

function MyApp({ Component, pageProps, hydrationData }: MyAppProps) {
	return (
		<RootStoreProvider hydrationData={hydrationData}>
			<Component {...pageProps} />
		</RootStoreProvider>
	);
}

export default MyApp;
