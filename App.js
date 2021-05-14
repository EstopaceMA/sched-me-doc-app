import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomNavigation } from 'react-native-paper';
import {Provider} from 'react-redux';

import {store} from './src/redux';
import COLORS from './src/consts/colors';
import { 
  SignUpScreen, 
  LoginScreen, 
  MainScreen
} from './src/screens';

import {
  PatientAppointmentScreen,
  PatientHomeScreen,
  PatientBookAppointmentScreen,
  PatientDoctorListScreen,
  PatientProfileScreen,
  PatientDetailsScreen
} from './src/screens/patient_screens';

import {
  DoctorHomeScreen, 
  DoctorAccountScreen,
  DoctorWorkScheduleScreen,
  DoctorSetWorkSchedScreen,
  DoctorAppointmentScreen,
  DoctorPendingAppointmentScreen,
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
      home: PatientHomeScreen,
      appointment: PatientAppointmentScreen
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
      { key: 'pending_appointment', title: 'Pending', icon: 'calendar-edit', color: COLORS.orange },
      { key: 'appointment', title: 'Appointment', icon: 'calendar', color: COLORS.primary },
      { key: 'profile', title: 'Profile', icon: 'account-details', color: COLORS.orange },
    ]);
    const renderScene = BottomNavigation.SceneMap({
      home: DoctorHomeScreen,
      pending_appointment: DoctorPendingAppointmentScreen,
      appointment: DoctorAppointmentScreen,
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
              headerLeft: null,
              headerStyle: {
                backgroundColor: COLORS.primary
              }
            }}
          />
          <Stack.Screen 
            name="DoctorTabs" 
            component={DoctorTabs} 
            options={{
              title: "Sched Mo Doc",
              headerLeft: null,
              headerStyle: {
                backgroundColor: COLORS.primary
              }
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
            component={PatientDetailsScreen} 
            options={{
              headerShown:false
            }}
          />
          <Stack.Screen 
            name="DoctorList" 
            component={PatientDoctorListScreen} 
            options={{ 
              title: 'Select a Doctor', 
              headerStyle: {
                backgroundColor: COLORS.primary
              }
            }}  
          />
          <Stack.Screen 
            name="BookAppointment" 
            component={PatientBookAppointmentScreen} 
            options={{ 
              title: 'Book an Appointment',
              headerStyle: {
                backgroundColor: COLORS.primary
              }
            }}
          />
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{
              headerShown:false
            }}
          />
          <Stack.Screen 
            name="SignUp" 
            component={SignUpScreen} 
            options={{
              headerShown:false
            }}
          />
          <Stack.Screen name="Profile" component={PatientProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}





