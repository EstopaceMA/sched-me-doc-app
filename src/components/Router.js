import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomNavigation, Text } from 'react-native-paper';

import { 
    AppointmentScreen, 
    HomeScreen, 
    DetailsScreen, 
    ProfileScreen, 
    SignUpScreen, 
    LoginScreen 
} from '../screens';


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

const SignedOut = () => {
    return(
        <>
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
        </>
    )
}

const SignedIn = () => {
    return(
        <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
    )
}

const createRootNavigator = (signedIn = false) => {

    return createStackNavigator(
        {
            SignedIn: {
                screen: SignedIn
            },
            SignedOut: {
                screen: SignedOut
            }
        },
        {
            initialRouteName: signedIn ? "SignedIn" : "SignedOut"
        }
    )


}

export default createRootNavigator;