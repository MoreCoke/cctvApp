import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import {Provider} from 'react-redux';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import store from './src/redux/configureStore';
import {setTDXToken, getTaipeiList} from './src/redux/apis/cctv';

const App = () => {
  return (
    <Provider store={store}>
      <DefaulScreen />
    </Provider>
  );
};

const DefaulScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <TouchableOpacity
          onPress={() => {
            setTDXToken();
          }}>
          <Text>set token</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            getTaipeiList()
              .then(res => res.json())
              .then(ans => console.log('ans: ', ans))
              .catch(err => console.log('error: ', err));
          }}>
          <Text>log cctv list</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
