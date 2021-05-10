import React, { useState, useEffect,  } from "react";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomNavigation } from 'react-native-paper';
import {Provider} from 'react-redux';
import {store} from './src/redux';
import COLORS from './src/consts/colors';

import { 
  AppointmentScreen, 
  HomeScreen, 
  DetailsScreen, 
  ProfileScreen, 
  SignUpScreen, 
  LoginScreen, 
  MainScreen, 
  BookAppointmentScreen, 
  DoctorListScreen 
} from './src/screens';

import {
  DoctorHomeScreen, 
  DoctorAccountScreen,
  DoctorWorkScheduleScreen,
  DoctorSetWorkSchedScreen
} from './src/screens/doctor_screens';

const Stack = createStackNavigator();

export default function App() {

  const PatientTabs = () => {
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

  const DoctorTabs = () => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
      { key: 'home', title: 'Home', icon: 'home', color: COLORS.primary },
      { key: 'appointment', title: 'Appointment', icon: 'calendar', color: COLORS.orange },
      { key: 'profile', title: 'Profile', icon: 'account-details', color: COLORS.primary },
    ]);
    const renderScene = BottomNavigation.SceneMap({
      home: DoctorHomeScreen,
      appointment: AppointmentScreen,
      profile: DoctorAccountScreen
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
    <Provider store={store}>
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
            name="PatientTabs" 
            component={PatientTabs} 
            options={{
              title: "Sched Me Doc",
              headerLeft: null
            }}
          />
          <Stack.Screen 
            name="DoctorTabs" 
            component={DoctorTabs} 
            options={{
              title: "Sched Mo Doc",
              headerLeft: null
            }}
          />
          <Stack.Screen 
            name="DocWorkSched" 
            component={DoctorWorkScheduleScreen}
            options={{
              title: "Working Schedule",
              headerStyle: {
                backgroundColor: COLORS.primary
              }
            }}
          />
          <Stack.Screen 
            name="DocSetWorkSched" 
            component={DoctorSetWorkSchedScreen}
            options={{
              title: "Set Working Time",
              headerStyle: {
                backgroundColor: COLORS.primary
              }
            }}
          />
          <Stack.Screen 
            name="Details" 
            component={DetailsScreen} 
            options={{
              headerShown:false
            }}
          />
          <Stack.Screen name="DoctorList" component={DoctorListScreen} options={{ title: 'Select a Doctor' }}/>
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="BookAppointment" component={BookAppointmentScreen} options={{ title: 'Book an Appointment' }}/>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}





