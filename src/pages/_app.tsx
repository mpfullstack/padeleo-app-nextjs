import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store, { persistor } from '@/modules/common/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import RouteGuard from '@/modules/common/components/RouteGuard';
import SWRCustomConfig from '@/modules/common/components/SWRCustomConfig';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme/theme';
import '@fontsource/mulish/300.css';
import '@fontsource/mulish/400.css';
import '@fontsource/mulish/500.css';
import '@fontsource/mulish/700.css';
import '@/theme/global.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouteGuard>
          <SWRCustomConfig>
            <ThemeProvider theme={theme}>
              <Component {...pageProps} />
            </ThemeProvider>
          </SWRCustomConfig>
        </RouteGuard>
      </PersistGate>
    </Provider>
  );
}
