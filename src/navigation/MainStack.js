// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NavigationNames from './NavigationNames';
import SettingsScreen from '../screens/Profile/SettingsScreen';
import Ionicons from '@expo/vector-icons/Ionicons'
import ContactsStack from "./ContactsStack"
import ChatsStack from "./ChatsStack"
import ProfileStack from "./ProfileStack"


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
              else if (route.name === 'ProfileStack') {
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
            <Tab.Screen name={'ProfileStack'} component={ProfileStack}
            options={{
              title: 'Me',
              headerShown: false
            }} />
        </Tab.Navigator>
      </NavigationContainer>
  );
}

export default MainStack;