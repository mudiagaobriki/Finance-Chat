import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import HomeStack from "./src/navigation/HomeStack"
// import io from 'socket.io-client';
import { useEffect } from 'react';
import AppRoute from './src/navigation/navigator';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

export default function App() {
  // useEffect(() => {
  //   io('http://192.168.43.154:3001')
  // },[])

  return (
    // <View style={styles.container}>
    //   <Text>Hello Mudi</Text>
    //   <StatusBar style="auto" />
    // </View>
    <Provider store={store}>
    <SafeAreaView style={{flex: 1, paddingTop: 0}}>
      <StatusBar
        style='auto'
      />
      <AppRoute />
    </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
