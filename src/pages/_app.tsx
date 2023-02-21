import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '@/modules/common/redux/store';
import RouteGuard from '@/modules/common/components/RouteGuard';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <RouteGuard>
        <Component {...pageProps} />
      </RouteGuard>
    </Provider>
  );
}
