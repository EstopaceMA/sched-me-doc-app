import React, { useState, useEffect,  } from "react";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomNavigation } from 'react-native-paper';
import { isSignedIn } from './src/auth/auth';

import { AppointmentScreen, HomeScreen, DetailsScreen, ProfileScreen, SignUpScreen, LoginScreen, MainScreen, BookAppointmentScreen } from './src/screens';
import COLORS from './src/consts/colors';

const Stack = createStackNavigator();

export default function App() {

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

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Main" 
          component={MainScreen} 
          options={{
            headerShown:false
          }}
        />
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
        <Stack.Screen name="BookAppointment" component={BookAppointmentScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}





