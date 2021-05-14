import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet } from "react-native";
import { Avatar } from 'react-native-elements';
import Screen from '../../components/Screen';
import COLORS from '../../consts/colors';

const PatientProfileScreen = () => { 
  const currentUser = useSelector(state => state.currentUser.user);
  const navigation = useNavigation();

  useEffect(() => {
    console.log(currentUser);
  },[])

  const onPressSetSchedule = () => {
    navigation.navigate("DocWorkSched");
  }

  return (
    <Screen>
      <View style={styles.userRow}>
        <View style={styles.userImage}>
          <Avatar
            rounded
            size="large"
            source={{uri: currentUser.image}}
          />
        </View>
        <View>
          <Text style={{ fontSize: 16 }}>{currentUser.name}</Text>
          <Text
            style={{
              color: 'gray',
              fontSize: 16,
            }}
          >
            {currentUser.email}
          </Text>
        </View>
      </View>
    </Screen>
  );
}

export default PatientProfileScreen;

const styles = StyleSheet.create({
  btn: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  scroll: {
    backgroundColor: 'white',
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
    backgroundColor: COLORS.white
  },
  userImage: {
    marginRight: 12,
  },
  containerInfoText: {
    paddingTop: 20,
    paddingBottom: 12,
    backgroundColor: '#F4F5F4',
  },
  infoText: {
    fontSize: 16,
    marginLeft: 20,
    color: 'gray',
    fontWeight: '500',
  },
});




