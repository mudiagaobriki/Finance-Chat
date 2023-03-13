// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigationNames from './NavigationNames';
import Splash from '../screens/intro/splash';
import Login from '../screens/auth/Login';
import PhoneSignup from '../screens/auth/PhoneSignup';
import OTPConfirmation from '../screens/auth/OTPConfirmation';
import Chat from '../screens/messaging/Chat';
import MessagesList from '../screens/messaging/MessagesList';
import PhoneContacts from '../screens/messaging/PhoneContacts';


const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={NavigationNames.Splash}>
        <Stack.Screen 
        name={NavigationNames.Splash} 
        component={Splash}
        options={{
            headerShown: true,
            headerTitle: '',
            headerTransparent: true,
            headerBackVisible: false,
        }} />
        <Stack.Screen 
        name={NavigationNames.Login} 
        component={Login}
        options={{
            headerShown: true,
            headerTitle: '',
            headerTransparent: true,
            headerBackVisible: false,
        }} />
        <Stack.Screen 
        name={NavigationNames.PhoneSignup} 
        component={PhoneSignup}
        options={{
            headerShown: true,
            headerTitle: '',
            headerTransparent: true,
            headerBackVisible: false,
        }} />
        <Stack.Screen 
        name={NavigationNames.OTPConfirmation} 
        component={OTPConfirmation}
        options={{
            headerShown: true,
            headerTitle: '',
            headerTransparent: true,
            headerBackVisible: false,
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthStack;