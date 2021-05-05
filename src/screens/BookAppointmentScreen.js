import React, {useState} from 'react';
import {View, StyleSheet, Text, Modal} from 'react-native';
import Screen from '../components/Screen';

import AppTextInput from '../components/AppTextInput';

const BookAppointmentScreen = ({navigation}) => {

  return (
    <Screen>
      <View style={styles.container}>
        <AppTextInput 
          placeholder="Description"
        />
      </View>
    </Screen>
  );
};

export default BookAppointmentScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});