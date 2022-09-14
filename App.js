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
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import store from './src/redux/configureStore';
import {setTDXToken, getTaipeiList} from './src/redux/apis/cctv';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="CCTV" component={CctvScreen} />
          <Stack.Screen name="Test" component={TestScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const TestScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <Text>test</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('CCTV', {hello: 'hi'})}>
        <Text>go cctv screen</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const CctvScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();

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
        <TouchableOpacity onPress={() => navigation.navigate('Test')}>
          <Text>go test screen</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
