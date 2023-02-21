import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store, { persistor } from '@/modules/common/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import RouteGuard from '@/modules/common/components/RouteGuard';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouteGuard>
          <Component {...pageProps} />
        </RouteGuard>
      </PersistGate>
    </Provider>
  );
}
