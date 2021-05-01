import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '@expo/vector-icons/FontAwesome5';
import { BottomNavigation, Text } from 'react-native-paper';

import { AppointmentScreen, HomeScreen } from './src/screens';

export default function App() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home', color: "#BADA55" },
    { key: 'appointment', title: 'Appointment', icon: 'calendar', color: "tomato" },
  ]);
  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    appointment: AppointmentScreen
  });
  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      shifting={true}
    />
  );
}


