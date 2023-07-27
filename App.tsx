/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import AppComponent from './src/screens';
import {QueryClient, QueryClientProvider} from 'react-query';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {Keyboard} from 'react-native';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SafeAreaView style={[styles.safeArea]}>
          <NativeBaseProvider>
            <TouchableWithoutFeedback
              style={{flex: 1}}
              onPress={() => Keyboard.dismiss()}>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}
                style={{flex: 1}}>
                <AppComponent />
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
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
