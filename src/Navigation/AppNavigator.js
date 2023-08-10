import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import DetailsScreen from '../Screens/DetailsScreen';
import FavoritesScreen from '../Screens/FavouriteScreen';
import WatchlistScreen from '../Screens/WatchlistScreen';
import { Ionicons } from 'react-native-vector-icons';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeTab}
       options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Image
            source={focused ? require('../../assets/images/home.jpg') : require('../../assets/images/home.jpg')}
            style={{ width: 24, height: 24 }}
          />
        ),
      }}
      />
      <Tab.Screen
        name="Favourite"
        component={FavoritesScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? require('../../assets/images/favourites.jpg') : require('../../assets/images/favourites.jpg')}
              style={{ width: 24, height: 24 }}
            />
          ),
        }}      />
         <Tab.Screen
        name="Watchlist"
        component={WatchlistScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? require('../../assets/images/watchlist.jpg') : require('../../assets/images/watchlist.jpg')}
              style={{ width: 24, height: 24 }}
            />
          ),
        }}      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? require('../../assets/images/profile.jpg') : require('../../assets/images/profile.jpg')}
              style={{ width: 24, height: 24 }}
            />
          ),
        }}      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
