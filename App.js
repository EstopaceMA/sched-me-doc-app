import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomNavigation, Text } from 'react-native-paper';

import { AppointmentScreen, HomeScreen, DetailsScreen, ProfileScreen } from './src/screens';
import COLORS from './src/consts/colors';

const Stack = createStackNavigator();

const BottomTabs = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'home', title: 'Home', icon: 'home', color: COLORS.primary },
    { key: 'appointment', title: 'Appointment', icon: 'calendar', color: COLORS.orange },
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

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Tabs" 
          component={BottomTabs} 
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen} 
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


