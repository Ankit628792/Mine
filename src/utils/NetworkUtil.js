import NetInfo from '@react-native-community/netinfo';

let isConnected = false;
let isDataServicePresent = false;

const subscribeToNetworkChanges = () => {
  NetInfo.addEventListener(state => {
    isConnected = state.isConnected;
    isDataServicePresent = state.details.isConnectionExpensive;
  });
};

const isNetworkAvailable = () => {
  return isConnected;
};

const isDataServiceEnabled = () => {
  return isDataServicePresent;
};

export default {
  subscribeToNetworkChanges,
  isNetworkAvailable,
  isDataServiceEnabled,
};
