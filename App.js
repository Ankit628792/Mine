import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import NetworkLayer from './src/NetworkLayer';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import {QueryClient, QueryClientProvider} from 'react-query';
import NetworkUtil from './src/utils/NetworkUtil';
import HttpService from './src/utils/axios-interceptor';

const queryClient = new QueryClient();

const App = () => {
  NetworkUtil.subscribeToNetworkChanges();
  HttpService.configure();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SafeAreaView style={{flex: 1}}>
          <StatusBar barStyle="default" />
          <NetworkLayer />
        </SafeAreaView>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
