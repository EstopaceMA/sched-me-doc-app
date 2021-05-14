import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
} from "react-native";

import Screen from '../components/Screen';
import COLORS from '../consts/colors';

const MainScreen = () => {
  const navigation = useNavigation();
  const currentUser = useSelector(state => state.currentUser);
  useEffect(() => {
    console.log(currentUser);
    if(currentUser.loggedIn){
      navigation.navigate((currentUser.user.type === "patient") ? "PatientTabs" : "DoctorTabs");
    }
  },[])
  
  return (
    <Screen>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={.7}
          onPress={() => {navigation.navigate('Login', 'patient')}}
        >
          <View style={styles.btn}>
              <Text style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}>
                Patient
              </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={.7}
          onPress={() => {navigation.navigate('Login', 'doctor')}}
        >
          <View style={styles.btn}>
              <Text style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}>
                Doctor
              </Text>
          </View>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent:"center" 
  },
  btn: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 10,
  }
});

export default MainScreen;