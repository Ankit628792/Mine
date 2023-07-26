/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import AppComponent from './src/screens';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Platform, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SafeAreaView style={[styles.safeArea]}>
          <NativeBaseProvider>
            <AppComponent />
          </NativeBaseProvider>
        </SafeAreaView>
      </Provider>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'lightgray',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingRight: 6,
  },
});

export default App;
