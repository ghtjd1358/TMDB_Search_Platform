import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@/screens/HomeScreen';
import ChatScreen from '@/screens/ChatScreen';
import ResultScreen from '@/screens/ResultScreen';
import HistoryScreen from '@/screens/HistoryScreen';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = (): React.JSX.Element => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Chat" component={ChatScreen} />
    <Stack.Screen name="Result" component={ResultScreen} />
    <Stack.Screen name="History" component={HistoryScreen} />
  </Stack.Navigator>
);
