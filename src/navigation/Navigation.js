// navigation/Navigation.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from '../src/pages/HomePage';
import LoginPage from '../src/pages/LoginPage';
import EventsPage from '../src/pages/EventsPage';
import CheckoutPage from '../src/pages/CheckoutPage';
import BookedEventsPage from '../src/pages/BookedEventsPage';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} options={{ title: 'Login to EventLink' }} />
        <Stack.Screen name="Home" component={HomePage} options={{ title: 'EventLink Home' }} />
        <Stack.Screen name="Events" component={EventsPage} options={{ title: 'Events' }} />
        <Stack.Screen name="Checkout" component={CheckoutPage} options={{ title: 'Checkout' }} />
        <Stack.Screen name="BookedEvents" component={BookedEventsPage} options={{ title: 'My Booked Events' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
