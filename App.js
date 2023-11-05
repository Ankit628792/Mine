import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, Linking, SafeAreaView, StatusBar } from 'react-native';
import NetworkLayer from './src/NetworkLayer';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import NetworkUtil from './src/utils/NetworkUtil';
import HttpService from './src/utils/axios-interceptor';
import { colors } from './src/utils/colors';
import { requestNotificationPermission } from './src/services/notificationService';
import VersionCheck from 'react-native-version-check';
import Splash from './src/components/Splash';

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);
  NetworkUtil.subscribeToNetworkChanges();
  HttpService.configure();

  useEffect(() => {
    checkUpdateNeeded();
    requestNotificationPermission();
  }, [])

  const checkUpdateNeeded = async () => {
    let updateNeeded = await VersionCheck.needUpdate();
    if (updateNeeded?.isNeeded) {
      Alert.alert('Please Update', 'You need to update app to the latest version to continue using Mine App', [
        {
          text: 'Update',
          onPress: () => {
            BackHandler.exitApp()
            Linking.openURL(updateNeeded.storeUrl);
          },
        },
      ])
    }
    else {
      setLoading(false)
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle="default" backgroundColor={colors.purple} />
          {
            loading ?
              <Splash />
              :
              <NetworkLayer />
          }
        </SafeAreaView>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
