// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NavigationNames from './NavigationNames';
import Splash from '../screens/intro/splash';
import Login from '../screens/auth/Login';
import PhoneSignup from '../screens/auth/PhoneSignup';
import OTPConfirmation from '../screens/auth/OTPConfirmation';
import Chat from '../screens/messaging/Chat';
import MessagesList from '../screens/messaging/MessagesList';
import PhoneContacts from '../screens/messaging/PhoneContacts';
import SettingsScreen from '../screens/Profile/SettingsScreen';
import Messaging from '../screens/messaging/Messaging';
import Ionicons from '@expo/vector-icons/Ionicons'


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ChatsStack(){
  return(
        // <NavigationContainer>
          <Stack.Navigator initialRouteName={NavigationNames.MessagesList}>
            <Stack.Screen 
            name={NavigationNames.Chat} 
            component={Chat}
            options={{
                headerShown: true,
                headerTitle: '',
                headerTransparent: true,
                headerBackVisible: false,
            }} />
            <Stack.Screen 
            name={NavigationNames.MessagesList} 
            component={MessagesList}
            options={{
                headerShown: true,
                headerTitle: '',
                headerTransparent: true,
                headerBackVisible: false,
            }} />
            <Stack.Screen 
            name={NavigationNames.PhoneContacts} 
            component={PhoneContacts}
            options={{
                headerShown: true,
                headerTitle: '',
                headerTransparent: true,
                headerBackVisible: false,
            }} />
            {/* <Stack.Screen 
            name={NavigationNames.SettingsScreen} 
            component={SettingsScreen}
            options={{
                headerShown: true,
                headerTitle: '',
                headerTransparent: true,
                headerBackVisible: false,
            }} /> */}
            <Stack.Screen 
            name={NavigationNames.Messaging} 
            component={Messaging}
            options={{
                headerShown: true,
                headerTitle: '',
                headerTransparent: true,
                headerBackVisible: false,
            }} />
          </Stack.Navigator>
        // </NavigationContainer>
  )
}

function ContactsStack(){
  return(
        // <NavigationContainer>
          <Stack.Navigator initialRouteName={NavigationNames.PhoneContacts}>
            {/* <Stack.Screen 
            name={NavigationNames.MessagesList} 
            component={MessagesList}
            options={{
                headerShown: true,
                headerTitle: '',
                headerTransparent: true,
                headerBackVisible: false,
            }} /> */}
            <Stack.Screen 
            name={NavigationNames.PhoneContacts} 
            component={PhoneContacts}
            options={{
                headerShown: true,
                headerTitle: '',
                headerTransparent: true,
                headerBackVisible: false,
            }} />
            
            {/* <Stack.Screen 
            name={NavigationNames.SettingsScreen} 
            component={SettingsScreen}
            options={{
                headerShown: true,
                headerTitle: '',
                headerTransparent: true,
                headerBackVisible: false,
            }} /> */}
            <Stack.Screen 
            name={NavigationNames.Messaging} 
            component={Messaging}
            options={{
                headerShown: true,
                headerTitle: '',
                headerTransparent: true,
                headerBackVisible: false,
            }} />
          </Stack.Navigator>
        // </NavigationContainer>
  )
}


function MainStack() {
  return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              
  
              if (route.name === 'ChatsStack') {
                iconName = focused
                  ? 'mail'
                  : 'mail-outline';
              } else if (route.name === 'ContactsStack') {
                iconName = focused ? 'reader-outline' : 'reader-outline';
              }
              else if (route.name === NavigationNames.SettingsScreen) {
                iconName = focused ? 'person-circle-outline' : 'person-circle-outline';
              }
  
              // You can return any component that you like here!
              return <>
                <Ionicons name={iconName} size={26} color={color} />
              </>;
            },
            tabBarActiveTintColor: 'green',
            tabBarInactiveTintColor: 'gray',
            tabBarShowLabel: true
            
          })}
        >
          <Tab.Screen name={'ChatsStack'} component={ChatsStack}
            options = {{
              title: 'Chats',
              headerShown: false,
              
            }}
             />
          <Tab.Screen name={"ContactsStack"} component={ContactsStack}
            options={{
              title: 'Contacts',
              headerShown: false
            }} />
            <Tab.Screen name={NavigationNames.SettingsScreen} component={SettingsScreen}
            options={{
              title: 'Me',
              headerShown: false
            }} />
        </Tab.Navigator>
      </NavigationContainer>
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName={NavigationNames.MessagesList}>
    //     <Stack.Screen 
    //     name={NavigationNames.Chat} 
    //     component={Chat}
    //     options={{
    //         headerShown: true,
    //         headerTitle: '',
    //         headerTransparent: true,
    //         headerBackVisible: false,
    //     }} />
    //     <Stack.Screen 
    //     name={NavigationNames.MessagesList} 
    //     component={MessagesList}
    //     options={{
    //         headerShown: true,
    //         headerTitle: '',
    //         headerTransparent: true,
    //         headerBackVisible: false,
    //     }} />
    //     <Stack.Screen 
    //     name={NavigationNames.PhoneContacts} 
    //     component={PhoneContacts}
    //     options={{
    //         headerShown: true,
    //         headerTitle: '',
    //         headerTransparent: true,
    //         headerBackVisible: false,
    //     }} />
    //     <Stack.Screen 
    //     name={NavigationNames.SettingsScreen} 
    //     component={SettingsScreen}
    //     options={{
    //         headerShown: true,
    //         headerTitle: '',
    //         headerTransparent: true,
    //         headerBackVisible: false,
    //     }} />
    //      <Stack.Screen 
    //     name={NavigationNames.Messaging} 
    //     component={Messaging}
    //     options={{
    //         headerShown: true,
    //         headerTitle: '',
    //         headerTransparent: true,
    //         headerBackVisible: false,
    //     }} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}

export default MainStack;