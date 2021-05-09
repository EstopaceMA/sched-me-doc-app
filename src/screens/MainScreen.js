import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Screen from '../components/Screen';
import COLORS from '../consts/colors';

const MainScreen = ({navigation}) => {
  return (
    <Screen>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {navigation.navigate('Login', 'patient')}}
        >
          <View style={styles.btn}>
              <Text style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}>
                Patient
              </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
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