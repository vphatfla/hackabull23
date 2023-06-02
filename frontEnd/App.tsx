/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeTabParamList } from './props/RootStackParam';
import {useFonts} from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import Home from './screens/Home';
import Main from './screens/Main'
import Info from './screens/Info';

function App() {
  const Stack = createNativeStackNavigator<HomeTabParamList>();
  const [fontLoaded] = useFonts({
    "Pacifico-Regular": require("./assets/fonts/Pacifico-Regular.ttf")
  })

  useEffect(()=>{
    (async ()=>await SplashScreen.preventAutoHideAsync())
  },[])

  if (!fontLoaded){
    return undefined;
  } else {
    SplashScreen.hideAsync()
  }
  return (
   <NavigationContainer >
      <Stack.Navigator >
        <Stack.Screen name='Home' component = {Home} options = {{headerShown: false}}/> 
        <Stack.Screen name='Main' component = {Main} /> 
        <Stack.Screen name = 'Info' component={Info} options = {{headerShown: false}}/>
      </Stack.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'stretch',
    justifycontent: 'center',
  },
  sectionTitle: {
    fontSize: 100,
    fontFamily: 'Pacifico-Regular',
    color: '#E63946',
  },
  title1:{
    fontSize: 100,
    color: '#E63946',
    fontFamily: 'Aclonica-Regular'
  },
  linearGradient: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionBody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});


export default App;