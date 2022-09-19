import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  TouchableOpacity,
  View,
} from 'react-native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {WebView} from 'react-native-webview';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import store from './src/redux/configureStore';
import {
  setTDXToken,
  getTaipeiList,
  getCityList,
  getCCTVList,
} from './src/redux/apis/cctv';
import cctvSlice from './src/redux/slices/cctv';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="CCTV" component={CctvScreen} />
          <Stack.Screen name="Test" component={TestScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
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

const DetailScreen = () => {
  const route = useRoute();
  return (
    <SafeAreaView>
      <View style={{height: 300}}>
        <WebView source={{uri: route.params.stream.VideoStreamURL}} />
      </View>
      <Text>{JSON.stringify(route.params.stream)}</Text>
    </SafeAreaView>
  );
};

const CctvScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const streams = useSelector(state => state.cctv.streams);
  const citys = useSelector(state => state.cctv.citys);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  useEffect(() => {
    getCityList().then(ans => dispatch(cctvSlice.actions.setCitys(ans)));
  }, [dispatch]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView horizontal style={{flexGrow: 0}}>
        {citys.map(city => (
          <TouchableOpacity
            key={city.code}
            onPress={() => {
              getCCTVList(city.code)
                .then(res => res.json())
                .then(ans => dispatch(cctvSlice.actions.setStreams(ans.CCTVs)));
            }}
            style={{backgroundColor: 'black', margin: 10}}>
            <Text style={{color: 'white'}}>{city.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
              .then(ans => dispatch(cctvSlice.actions.setStreams(ans.CCTVs)))
              .catch(err => console.log('error: ', err));
          }}>
          <Text>log cctv list</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Test')}>
          <Text>go test screen</Text>
        </TouchableOpacity>
        {streams.map(stream => (
          <TouchableOpacity
            key={stream.CCTVID}
            onPress={() => navigation.navigate('Detail', {stream})}>
            <Text>
              {`${stream.CCTVID}:  ${stream.SurveillanceDescription}`}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
