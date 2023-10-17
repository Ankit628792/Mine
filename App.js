import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import NetworkLayer from './src/NetworkLayer';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import NetworkUtil from './src/utils/NetworkUtil';
import HttpService from './src/utils/axios-interceptor';
import ErrorBoundary from './src/components/ErrorBoundary';
import { colors } from './src/utils/colors';

const queryClient = new QueryClient();

const App = () => {
  NetworkUtil.subscribeToNetworkChanges();
  HttpService.configure();

  return (
    // <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle="default" backgroundColor={colors.purple} />
          <NetworkLayer />
        </SafeAreaView>
      </Provider>
    </QueryClientProvider>
    //  </ErrorBoundary>
  );
};

export default App;
