import React from 'react';
import { View, Text, StyleSheet } from "react-native";

import Screen from '../components/Screen';

const ProfileScreen = () => {
    return (
      <Screen>
        <View style={styles.container}>
          <Text>PROFILE SCREEN</Text>
        </View>
      </Screen>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1 }
});

export default ProfileScreen;