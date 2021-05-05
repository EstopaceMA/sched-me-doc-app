import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Screen from '../components/Screen';
import COLORS from '../consts/colors';
import firebase from '../auth/firebase';

const ProfileScreen = ({navigation}) => {
  const signOut = () => {
    firebase.auth().signOut().then(() => {
      navigation.navigate('Login')
    })
    .catch(error => console.log(error))
  }  

  return (
    <Screen>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => signOut()}
        >
          <View style={styles.btn}>
              <Text style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}>
                Log Out
              </Text>
          </View>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent:"center" },
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

export default ProfileScreen;